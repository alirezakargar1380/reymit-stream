import { Request, Response } from "express";
import Exception from "../../utils/error.utility";
import pardakhtPay from "../../services/peyment_methods/pardakhtpay";
import payPing from "../../services/peyment_methods/payping";
import idPay from "../../services/peyment_methods/idpay";
const responseUtils = require('./../../utils/response.utitlity');
import mongoose from "mongoose";
import zarinpal from "../../services/peyment_methods/zarinpal";
import validation from "../../validation/gateway/gateway.validation";

import {
    userRepository,
    appearanceSettingsRepository,
    mainSettingsRepository,
    toolsTargetRepository,
    donateRepository,
} from "../../shared/config";
import * as serviceToolsTarget from "./../../services/tools/target/tools.target.services"
import * as socketService from "./../../services/socket/socket.service"
import * as premiumCheck from "../../services/premium_check/premium_check";
import { IUser } from "../../shared/interfaces/user.interface";
import { IToolsTarget } from "../../shared/interfaces/tools/target/tools.target.interface";
import { IGatewayAppearanceSettings } from "../../shared/interfaces/gateway/GatewayAppearanceSettings.interface";
import { IGatewayMainSettings } from "../../shared/interfaces/gateway/gateway-main-settings.interface";
import { request_answer } from "../../types/payment_methods/payment_methods";
import { Idonates } from "../../shared/interfaces/donates/donates.interface";

import { gateway_constants } from "../../shared/constants/gateway/gateway.constants";

// setTimeout(async () => {
//     await serviceToolsTarget.update_target('62c2efe46d0f2cc10261abee', 100)
// }, 2000)

export const get_gateway_details_by_address = async (req: Request, res: Response) => {
    try {
        validation.check_gateway_address(req.params); // validating gateway address

        // getting user by gateway address from database
        const user: IUser | null = await userRepository.findGateway(
            { gatewayAddress: req.params.gatewayAddress, isGatewayActive: true },
            { password: false }
        );

        // checking
        if (!user) throw Exception.setError("gateway not found or its not active", true); // checking user exist
        await premiumCheck.check(user._id.toString()); // checking user have active package or not

        // getting settings
        const appearance_settings: IGatewayAppearanceSettings = await appearanceSettingsRepository.findByUserId(user._id.toString()) as IGatewayAppearanceSettings; // getting appearance settings from database
        const main_settings: IGatewayMainSettings = await mainSettingsRepository.findByUserId(user._id.toString()) as IGatewayMainSettings; // getting main settings database

        // finding target if we have to show target
        let target: IToolsTarget | null = null
        if (main_settings != null && main_settings.reqirement_data.show_target)
            target = await toolsTargetRepository.findByUserId(user._id); // geting target from database

        responseUtils.success(res, { appearance: appearance_settings, target: target })

    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const donate = async (req: Request, res: Response) => {
    try {
        // validations
        validation.donate(req.body); // validate donate details
        validation.check_gateway_address(req.params); // validate gateway address

        if (!req.body.has_accepted_terms) throw Exception.setError('you cant donate without accepting terms', true); // checking donator has accepted term
        const user: IUser | null = await userRepository.findGateway({ gatewayAddress: req.params.gatewayAddress, isGatewayActive: true }); // getting user by gateway address from database
        if (!user) throw Exception.setError("gateway not found or its not active", true); // checking user exist
        await premiumCheck.check(user._id.toString()); // checking user have active package or not

        const main_settings: IGatewayMainSettings = await mainSettingsRepository.findByUserId(user._id.toString()) as IGatewayMainSettings; // getting main settings from database

        // checking amount range
        if (main_settings.filter_amount_of_support)
            if (main_settings!.minimum_amount_of_support > req.body.amount_irr || main_settings!.maximux_amount_of_support < req.body.amount_irr) {
                throw Exception.setError(`amount should be between ${main_settings.minimum_amount_of_support} and ${main_settings.maximux_amount_of_support}`, true);
            }

        // finding default payment method
        let payment_method: string | null = null
        let peyment_method_key: string | null = null
        Object.entries(main_settings!.gateways).forEach(
            ([key, value]: any) => {
                if (value.is_default) {
                    payment_method = key
                    peyment_method_key = value.code
                }
            }
        );

        // error if default payment method not found
        if (payment_method == null || peyment_method_key == null) {
            throw Exception.setError('payment method not found', true)
        }

        // customize data and config for each payment method
        let method: pardakhtPay | payPing | idPay | zarinpal
        let donateId: mongoose.Types.ObjectId = new mongoose.Types.ObjectId()
        let customData: any = {}
        switch (payment_method) {
            case gateway_constants.pardakhtpay: {
                method = new pardakhtPay(peyment_method_key)
                break
            }

            case gateway_constants.payping: {
                method = new payPing(peyment_method_key)
                break
            }

            case gateway_constants.idpay: {
                method = new idPay(peyment_method_key)
                customData.order_id = donateId
                break
            }

            case gateway_constants.zarinpal: {
                method = new zarinpal(peyment_method_key)
                customData.Description = req.body.desc || 'None'
                break
            }

            default:
                throw Exception.setError('payment method not found', true)

        }

        // request gateway
        const result: request_answer = await method.request(
            Number(req.body.amount_irr),
            `${process.env.MAIN_WEBSITE_URL}/api/gateway/${req.params.gatewayAddress}/donate/verify/${payment_method}`,
            customData
        )

        // saving donate details in database
        await donateRepository.create({
            _id: donateId,
            amount_irr: req.body.amount_irr,
            displayName: req.body.displayName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            description: req.body.desc,
            publishName: req.body.publishName,
            publishDesc: req.body.publishDesc,
            publishNameInDonatorList: req.body.publishNameInDonatorList,
            paymentMethod: payment_method,
            token: result.token,
            userId: new mongoose.Types.ObjectId(user._id),
            has_accepted_terms: req.body.has_accepted_terms
        })

        responseUtils.success(res, result.link)
    } catch (e: any) {
        console.error("we have an error")
        console.error(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const verify_donate = async (req: Request, res: Response) => {
    try {
        validation.check_gateway_address(req.params); // validating gateway address

        // finding user by gateway address in database
        const user: IUser | null = await userRepository.findGateway({
            gatewayAddress: req.params.gatewayAddress,
            isGatewayActive: true
        });

        if (!user) throw Exception.setError("gateway not found or its not active", true); // checking user exist
        premiumCheck.check(user._id.toString()); // checking user have active package or not

        const main_settings: IGatewayMainSettings = await mainSettingsRepository.findByUserId(user._id.toString()) as IGatewayMainSettings; // getting main settings from database

        // return donate if verified is false else error
        const unVerifiedDonate = async (token: string): Promise<Idonates> => {
            const donate: Idonates | null = await donateRepository.donateByToken(token); // getting details of donate from database
            if (donate === null) throw Exception.setError("invalid token", true); // error if donate not found
            if (donate.verified) throw Exception.setError("transmission already verified", true); // error if donate already verified
            return donate
        }

        // getting token and verify with customize data for each payment method
        let method: pardakhtPay | payPing | idPay | zarinpal
        let token: string | null = null
        let donate: Idonates | null = null
        let transid: string | null = null;
        let customData: any = {}
        switch (req.params.paymentMethod) {
            case gateway_constants.pardakhtpay: {
                token = req.query.token as string
                method = new pardakhtPay(main_settings.gateways[gateway_constants.pardakhtpay].code)
                donate = await unVerifiedDonate(token)
                transid = (await method.verify(token, customData)).transId
                break
            }
            case gateway_constants.payping: {
                token = req.body.code as string
                method = new payPing(main_settings.gateways[gateway_constants.payping].code)
                donate = await unVerifiedDonate(token)
                customData.amount = donate.amount_irr
                transid = await method.verify(req.body.refid, customData)
                break
            }
            case gateway_constants.idpay: {
                token = req.body.id as string
                method = new idPay(token)
                donate = await unVerifiedDonate(main_settings.gateways[gateway_constants.idpay].code)
                customData.order_id = donate._id.toString()
                transid = await method.verify(token, customData)
                break
            }
            case gateway_constants.zarinpal: {
                token = req.query.Authority as string
                method = new zarinpal(main_settings.gateways[gateway_constants.zarinpal].code)
                donate = await unVerifiedDonate(token)
                customData.Amount = donate.amount_irr
                transid = await method.verify(token, customData)
                break
            }
            default: {
                throw Exception.setError("payment method not found", true);
            }
        }

        await donateRepository.verifyByToken(token, transid); // verify donate in database

        // send donation alert
        await socketService.setup_settings(donate.userId.toString(), donate.amount_irr)
        socketService.donation_alert(donate.userId.toString(), {
            amount: donate.amount_irr,
            details: donate.description,
            donation_name: donate.displayName,
            test: false,
            publishDesc: donate.publishDesc,
            publishName: donate.publishName
        })

        // update target
        await serviceToolsTarget.update_target(donate.userId.toString(), (donate.amount_irr / 10))

        responseUtils.success(res, 'donation successful');

    } catch (e: any) {
        console.error("we have an error")
        console.error(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}