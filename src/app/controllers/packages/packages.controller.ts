import { Request, Response } from "express";
const responseUtils = require('./../../utils/response.utitlity');
import Exception from "../../utils/error.utility";
import validation from "../../validation/packages/packages.validation";
import pardakhtPay from "../../services/peyment_methods/pardakhtpay";
import * as subscription from '../../services/subscription/subscription'
import {
    codePackageRepository,
    usedTrialPackageRepository,
    packageRepository,
    userRepository,
    buyPackageRequestRepository,
} from '../../shared/config'
import { IBuyPackageRequest, ICodePackage, IPackage } from "../../shared/interfaces/package.interface";
import { IUser } from "../../shared/interfaces/user.interface";
import { IUsedTrialPackage } from "../../shared/interfaces/usedTrialPackage.interface";
import { ObjectId } from "mongodb";
import moment from "moment"
import { gateway_constants } from "../../shared/constants/gateway/gateway.constants";

export const get_packages = async (req: Request, res: Response) => {
    let packages: IPackage[] = await packageRepository.getAll(); // get all normal packages from database
    packages.forEach((data: IPackage) => {
        data.image = process.env.AWS_DEFAULT_PATH + data.image
    })
    responseUtils.success(res, packages)
}

// setTimeout(async () => {


//     console.log(data[0])
// }, 2000)

export const get_package_history = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, await buyPackageRequestRepository.history(res.locals.user_id));
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}

export const active_code_package = async (req: Request, res: Response) => {
    try {
        validation.active_code_package(req.params); // validating

        const package_: ICodePackage | null = await codePackageRepository.findByCode(req.params.code); // get package by code from database
        if (package_ == null) throw Exception.setError("invalid code", true); // error if package is null

        const start = moment(new Date())
        const end = moment(package_.updatedAt)
        
        console.log(end.diff(start, "days"))

        if (end.diff(start, "days") >= package_.expire_day) throw Exception.setError("package has been expire", true);

        await subscription.add(res.locals.user_id, package_.day); // add time to end subscription date
        await codePackageRepository.deleteByCode(req.params.code); // delete code package from database because code used
        responseUtils.success(res, "your package activated");
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}


export const active_trial_package = async (req: Request, res: Response) => {
    try {
        // validation.active_trial_package(req.params); // validating

        // checking used trial packages from database to avoid use trial package twice
        const used: IUsedTrialPackage | null = await usedTrialPackageRepository.findByUserIdAndPackageId(res.locals.user_id);
        if (used != null) throw Exception.setError("you are already used this trial package", true);

        // checking package is trial from database
        // const package_: IPackage | null = await packageRepository.findTrialPackageById(req.params.package)
        // if (package_ == null) throw Exception.setError("invalid package", true);

        // await subscription.add(res.locals.user_id, package_.day); // add time to end subscription date
        await subscription.add(res.locals.user_id, 30); // add time to end subscription date

        // saving details of used package in database to avoid use trial package twice
        await usedTrialPackageRepository.create({
            userId: new ObjectId(res.locals.user_id),
            // packageId: new ObjectId(req.params.package)
        })

        // add this user and package for buying this package
        // await buyPackageRequestRepository.create({
        //     token: "nothing",
        //     iri_price: 0,
        //     gateway: "nothing",
        //     package: new ObjectId(req.params.package),
        //     user: new ObjectId(res.locals.user_id),
        //     verified: true
        // })

        responseUtils.success(res, "your trial package activated");
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}


export const buy_package = async (req: Request, res: Response) => {
    try {
        validation.buy_package(req.params); // validating

        // ready for pardakhtpay request
        // if (!process.env.PARDAKHTPAY_APIKEY) throw Exception.setError("we will fail to get gateway from pardakhtpay", true); // error if we dont have pardakhtpay api key
        const pardakhtPayObj: pardakhtPay = new pardakhtPay(process.env.PARDAKHTPAY_APIKEY || ''); // make a pardakhtpay object to request

        const package_: IPackage | null = await packageRepository.findPackageById(req.params.package); // getting package by id from database
        if (package_ == null) throw Exception.setError("invalid package", true); // check package exist

        // make a pardakhtpay request
        const pardakhtpay_req: any = await pardakhtPayObj.request(
            package_.iri_price,
            `${process.env.MAIN_WEBSITE_URL}/api/packages/buy/verify`
        )

        // get last tracking code
        let tracking_code: number = 10000000
        const lastBuyReq: IBuyPackageRequest | null = await buyPackageRequestRepository.findLastRecord()
        
        if (lastBuyReq) tracking_code = lastBuyReq.tracking_code + 1

        // saving buy package request in database
        await buyPackageRequestRepository.create({
            token: pardakhtpay_req.token,
            iri_price: package_.iri_price,
            gateway: gateway_constants.pardakhtpay,
            package: new ObjectId(req.params.package),
            user: new ObjectId(res.locals.user_id),
            verified: false,
            description: null,
            tracking_code: tracking_code
        })

        responseUtils.success(res, pardakhtpay_req.link);
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}


export const buy_verify = async (req: Request, res: Response) => {
    try {
        validation.bought_package(req.query); // validating

        if (req.query.status != '1') throw Exception.setError("transmission failed", true); // error if pardakhtpay status not 1

        // ready for pardakhtpay verify
        // if (!process.env.PARDAKHTPAY_APIKEY) throw Exception.setError("we will fail to get gateway from pardakhtpay", true); // error if we dont have pardakhtpay api key
        const pardakhtPayObj: pardakhtPay = new pardakhtPay(process.env.PARDAKHTPAY_APIKEY || ''); // make a pardakhtpay object to verify

        const buyPackageRequest: IBuyPackageRequest | null = await buyPackageRequestRepository.findByToken(req.query.token as string); // get buy package request from database

        if (buyPackageRequest == null) throw Exception.setError("invalid token", true); // check request is valid
        if (buyPackageRequest.verified) throw Exception.setError("transmission already verified", true); // check request not verified before

        // get package from database
        const package_: IPackage | null = await packageRepository.findPackageById(buyPackageRequest.package.toString())
        if (!package_) throw Exception.setError({ message: "package not found" }, true) // check package exist

        // get user from database
        const user: IUser | null = await userRepository.findById(buyPackageRequest.user.toString())
        if (!user) throw Exception.setError({ message: "user not found" }, true); // check user exist

        const par = await pardakhtPayObj.verify(req.query.token as string)

        const updatedData: {} = {
            verified: true,
            transid: par.transId,
            description: par.description
        }

        // verify buy package request in database
        await buyPackageRequestRepository.verifyByToken(
            req.query.token as string,
            updatedData
        )

        await subscription.add(user._id.toString(), package_.day); // add time to end subscription date

        responseUtils.success(res, 'your package activated');
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions);
        } else {
            responseUtils.error(res, "internal server error");
        }
    }
}
