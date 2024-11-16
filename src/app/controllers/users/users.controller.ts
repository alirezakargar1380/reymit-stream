// Schema
import UserSchema from "../../models/user.model"
import authentication_code_Schema from "../../models/authentication_code.model"
import buy_package_requests from "../../models/buy_package_requests"
import subscriptionModel from "../../models/subscription.model";

// Services
import validation from "../../validation/users/users.validation";
import fileValidation from "../../validation/file/file.validation";
import { Request, Response } from "express"

import { random_auth_code } from "../../utils/number.utility";
const Kavenegar = require('kavenegar');
const mongoose = require('mongoose');
import PhoneVerifyRequest from "../../models/phone_verify_requests.model";
import EmailVerifyRequest from "../../models/email_verify_request.model";

// services
import email_service from "../../services/emails/email.service";
import * as service_userActivity from "./../../services/users/user_activites.service"

// utilites
import * as utilitys_days from "./../../utils/days.utilitys"
const responseUtils = require('./../../utils/response.utitlity');
import Exception from "../../utils/error.utility";

// Packages
import { v4 } from "uuid";
import path from "path";
import sharp from "sharp";
import fs from "fs";
import multer from "multer";
import moment from "moment"

// configs
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024,
    }
}).single('image')
import * as calculation from '../../misc/calculation'
import { IUser } from "../../shared/interfaces/user.interface";
import { userRepository } from "../../shared/config";
import * as storage from "../../services/storage/storage";
import { EUserActivites_Sections } from "../../shared/interfaces/user_activites.interface";
import { file_manager } from "../../services/file/file_manager";
import { IUploadFileStorage } from "../../shared/interfaces/files/storage.interface";
import { getKeyByLink } from "../../utils/s3.utilitys";

/*
    TODO:
        1. upload image:
            - check extension of uploded file
        2. user:
            - HASH password
            - get user details from middleware and move that data to controller
        3.

*/

export const email_verification = async (req: Request, res: Response) => {
    try {
        // check this user not verified before 
        /* const user: any = await UserSchema.findOne({
             email: req.body.email,
         })*/
        const user: IUser | null = await userRepository.findByEmail(req.body.email)

        if (!user) {
            throw Exception.setError({
                message: "this user not found",
            }, true)
        }

        if (user.email_verification) {
            throw Exception.setError({
                message: "this user already verified",
            }, true)
        }

        const authentication_code = await authentication_code_Schema.findOne({
            email: req.body.email,
            code: req.body.code,
            timestamp: {
                // 29 minutes ago (from now)
                $gt: new Date(new Date().getTime() - 1000 * 60 * 29)
            }
        })

        if (!authentication_code) {
            throw Exception.setError({
                message: "invalid authentication code or expired",
            }, true)
        }

        /*await UserSchema.findByIdAndUpdate({
            _id: user._id,
        }, {
            email_verification: true,
        })*/
        await userRepository.updateById(user._id.toString(), { email_verification: true })

        responseUtils.success(res, "email verification success")
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const forget_password = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, "email was succfully send to the client")
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const profile = async (req: Request, res: Response) => {
    try {
        const user: IUser = await userRepository.findById(res.locals.user_id, { password: false }) as IUser; // get user details from database
        responseUtils.success(res, {
            user: user,
            payments: await buy_package_requests.find({ verified: true, user: user._id }), // get success payments from database
        })
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const edit_info = async (req: Request, res: Response) => {
    try {
        validation.edit_info(req.body)
        const user = await userRepository.findById(res.locals.user_id)
        if (!user) throw Exception.setError({ message: "user not found" }, true)

        const changed_last_10_days: boolean = await service_userActivity.check_activity_byCreateDay({
            user_id: res.locals.user_id,
            section: EUserActivites_Sections.changing_gateway_address,
            timestamp: {
                $gt: utilitys_days.getDate_of_a_day(10)
            }
        })

        if (!changed_last_10_days) {
            throw Exception.setError("you changed your gateway address last 10 day", true)
        }

        user.displayName = req.body.displayName
        user.gatewayAddress = req.body.gatewayAddress
        user.isGatewayActive = 'isGatewayActive' in req.body ? req.body.isGatewayActive == 'true' : false
        await userRepository.updateById(user._id.toString(), user)

        // =============================================================== ACTIVITY
        await service_userActivity.add_activity({
            user_id: res.locals.user_id,
            section: EUserActivites_Sections.changing_gateway_address,
            before_data: user.gatewayAddress,
            after_data: req.body.gatewayAddress,
        })

        responseUtils.success(res, user)
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const edit_password = async (req: Request, res: Response) => {
    try {
        validation.edit_password(req.body)
        if (req.body.newPassword1 != req.body.newPassword2) {
            throw Exception.setError({ message: "new password and confirm new password doesn't match", }, true)
        }
        // const user = await UserSchema.findOne({ _id: res.locals.user_id })
        const user = await userRepository.findById(res.locals.user_id)
        if (!user) throw Exception.setError({ message: "user not found" }, true) //todo: set error

        if (user.password == req.body.currentPassword) {
            user.password = req.body.newPassword1
            // await user.save()
            await userRepository.updateById(user._id.toString(), user)
        } else {
            throw Exception.setError({ message: "invalid current password", }, true)
        }
        responseUtils.success(res, {})
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const edit_phone_number = async (req: Request, res: Response) => {
    try {
        validation.edit_phone_number(req.body)

        if ((await UserSchema.findOne({ phoneNumber: req.body.phoneNumber })) != null) {
            throw Exception.setError({ message: "this number is already used", }, true)
        }

        const last_1_minutes = await PhoneVerifyRequest.findOne({
            user: mongoose.Types.ObjectId(res.locals.user_id),
            timestamp: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 1)
            }
        })

        if (last_1_minutes != null) {
            throw Exception.setError({ message: "wait a minute" }, true)
        }

        // const code = random_auth_code()
        const code = '123456'

        const api = Kavenegar.KavenegarApi({
            apikey: '67346B3148745233414B595657383434644F4571547633585A4B674A3746422B5171414858623351794A453D'
        });

        await api.Send({ message: code, sender: "100047778", receptor: req.body.phoneNumber })

        await PhoneVerifyRequest.create({
            code: code,
            phoneNumber: req.body.phoneNumber,
            user: mongoose.Types.ObjectId(res.locals.user_id)
        })

        responseUtils.success(res, 'code sended')
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const verify_edit_phone_number = async (req: Request, res: Response) => {
    try {
        validation.verify_edit_phone_number(req.body)

        const last_1_minutes = await PhoneVerifyRequest.findOne({
            user: mongoose.Types.ObjectId(res.locals.user_id),
            phoneNumber: req.body.phoneNumber,
            timestamp: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 1)
            }
        })

        if (last_1_minutes == null) {
            throw Exception.setError({ message: "you dont have request", }, true)
        }

        if ((await UserSchema.findOne({ phoneNumber: last_1_minutes.phoneNumber })) != null) {
            throw Exception.setError({ message: "this number is already used", }, true)
        }

        if (req.body.code == last_1_minutes.code) {
            /* await UserSchema.update({
                 _id: mongoose.Types.ObjectId(res.locals.user_id)
             }, {
                 phoneNumber: req.body.phoneNumber,
                 phoneNumber_verification: true
             })*/
            await userRepository.updateById(res.locals.user_id, {
                phoneNumber: req.body.phoneNumber,
                phoneNumber_verification: true
            })
        } else {
            throw Exception.setError({ message: "invalid code", }, true)
        }

        responseUtils.success(res, 'phone number verified')
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const update_avatar = async (req: Request, res: Response) => {
    // BUG
    upload(req, res, async function (err) {
        try {
            if (err) throw Exception.setError(err.message, true); // error if upload failed

            fileValidation.update_profile(req.file); // validate avatar file
            if (!req.file) throw Exception.setError("please select a file", true)

            // uploading image to s3
            const fileManager = new file_manager({
                mimetype: req.file.mimetype as string,
                file_name: v4(),
                user_id: res.locals.user_id,
            })

            let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})

            const update_data: IUser | null = await userRepository.updateById(res.locals.user_id, {
                avatar: uploadResult.location as string
            })
            if (!update_data) throw Exception.setError("", true)

            update_data.avatar = uploadResult.location as string
            // saving avatar url in database
            responseUtils.success(res, update_data);

        } catch (e: any) {
            if (e.extensions) {
                responseUtils.error(res, e.extensions)
            } else {
                responseUtils.error(res, "internal server error")
            }
        }
    })
}

export const delete_avatar = async (req: Request, res: Response) => {
    try {
        // BUG
        let user: IUser | null = await userRepository.findById(res.locals.user_id) as IUser

        if (!user.avatar) throw Exception.setError("you havent any avatar yet", true)

        const fileManager = new file_manager({})
        await fileManager.delete(getKeyByLink(user.avatar))
        // deleting old avatar file
        // const fileName: string = user.avatar.split(`/`).pop() as string // getting name of emoji file by url
        // await storage.deleteFile(fileName); // delete emoji file in object storage by name of emoji file
        user = await userRepository.updateById(res.locals.user_id, {
            avatar: ''
        })
        if (!user) throw Exception.setError("user not found", true)
        user.avatar = ''

        responseUtils.success(res, user)
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const edit_email = async (req: Request, res: Response) => {
    try {
        // validation.edit_email(req.body)
        const exist_email: IUser | null = await userRepository.findByEmail(req.body.email)
        if (exist_email) {
            throw Exception.setError({ message: "this email is already used", }, true)
        }

        const last_1_minutes = await EmailVerifyRequest.findOne({
            user: mongoose.Types.ObjectId(res.locals.user_id),
            timestamp: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 1)
            }
        })

        if (last_1_minutes != null) {
            throw Exception.setError({ message: "wait a minute" }, true)
        }

        const code = calculation.generateId(16)

        const url = `${process.env.MAIN_WEBSITE_URL}/api/users/profile/edit/email/verify?email=${req.body.email}&code=${code}`
        const VerifyEmailTemplate = fs.readFileSync(path.join(__dirname, "/../../../template/Verify Email - MyCamp.html"), {
            encoding: "utf-8"
        })//todo: convert to ejs and render

        const new_data = VerifyEmailTemplate.replace("{%LINK%}", url)

        const email = new email_service({
            html: new_data,
            subject: "Verify Changing Email"
        })
        await email.send(req.body.email)


        await EmailVerifyRequest.create({
            code: code,
            email: req.body.email,
            user: mongoose.Types.ObjectId(res.locals.user_id)
        })

        responseUtils.success(res, 'code sended')
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const verify_edit_email = async (req: Request, res: Response) => {
    try {
        const email: string | any = req.query.email
        if (!email) {
            throw Exception.setError({ message: "email not found" }, true)
        }
        validation.verify_edit_email(req.query)

        const last_1_minutes = await EmailVerifyRequest.findOne({
            user: mongoose.Types.ObjectId(res.locals.user_id),
            email: req.query.email,
            timestamp: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 1)
            }
        })

        if (last_1_minutes == null) {
            throw Exception.setError({ message: "you dont have request", }, true)
        }

        if ((await UserSchema.findOne({ email: last_1_minutes.email })) != null) {
            throw Exception.setError({ message: "this email is already used", }, true)
        }

        if (req.query.code == last_1_minutes.code) {
            /*     await UserSchema.update({
                     _id: mongoose.Types.ObjectId(res.locals.user_id)
                 }, {
                     email: req.query.email,
                     email_verification: true
                 })*/
            await userRepository.updateById(res.locals.user_id, {
                email: email,
                email_verification: true
            })
        } else {
            throw Exception.setError({ message: "invalid code", }, true)
        }

        responseUtils.success(res, 'email verified')
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const subscriptionDetail = async (req: Request, res: Response) => {
    try {
        const data: any = await subscriptionModel.findOne({
            userId: res.locals.user_id
        })

        if (!data) throw Exception.setError("this user dosent have any subscription", true)
        
        const start = moment(new Date())
        const end = moment(data.endSubscriptionDate)
        
        let p = (end.diff(start, "days") / data.daysOfPackage) * 100
    
        responseUtils.success(res, {
            leftMonth: end.diff(start, "month"),
            leftDays: end.diff(start, "days"),
            totalDays: data.daysOfPackage,
            leftSupscriptionDatePerenge: parseFloat(p.toFixed()),
            endDate: data.endSubscriptionDate,
            startDate: data.createdAt
        })
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}