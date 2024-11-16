// Packages
import { Request, Response } from "express"
import path from "path";
import sharp from "sharp";
import multer from "multer";
import fs from "fs";
import { v4 } from "uuid"
import Exception from "../../utils/error.utility";

// Schema
const responseUtils = require('./../../utils/response.utitlity');
import MainGateWaySettings_Schema from "../../models/gateway_main_settings.model"

// VALIDATION
import validation from "../../validation/settings/main_settings.validation";
import fileValidation from "../../validation/file/file.validation";

// SERVICE
import { file_manager } from "./../../services/file/file_manager"
import { IUploadFileStorage } from "./../../shared/interfaces/files/storage.interface"
import { storageFileManager } from "../../services/storage/storage";
import { getKeyByLink } from "../../utils/s3.utilitys";

// CONFIGURATION
const upload = multer({
    limits: {
        fileSize: 1 * 1024 * 1024,
    }
}).single('image')


export const update_gateway_profile = async (req: Request, res: Response) => {
    upload(req, res, async function (err) {
        try {
            if (err) return res.status(400).json({
                success: false,
                message: err.message
            })

            if (!req.file) throw Exception.setError("Please select a file", true)
            fileValidation.update_gateway_profile(req.file)

            // upload
            const fileManager = new file_manager({
                mimetype: req.file.mimetype as string,
                file_name: v4(),
                user_id: res.locals.user_id,
            })
            let uploadResult: IUploadFileStorage = await fileManager.create(req.file.buffer as {})

            const MainGateWaySettings = await MainGateWaySettings_Schema.findOne({
                user_id: res.locals.user_id
            })
            if (!MainGateWaySettings) throw Exception.setError("MainGateWaySettings not found", true)
            MainGateWaySettings.gateway_logo = uploadResult.location as string
            await MainGateWaySettings.save()

            responseUtils.success(res, await MainGateWaySettings.save());
        } catch (e: any) {
            if (e.extensions) {
                responseUtils.error(res, e.extensions)
            } else {
                responseUtils.error(res, "internal server error")
            }
        }
    })
}

export const delete_gateway_logo = async (req: Request, res: Response) => {
    try {
        const users_detail = await MainGateWaySettings_Schema.findOne({
            user_id: res.locals.user_id
        })
        if (!users_detail) throw Exception.setError('not found', true)

        // return responseUtils.success(res, getKeyByLink(users_detail.gateway_logo))
        if (!users_detail.gateway_logo) throw Exception.setError('you havent any profile', true)
        const file = new storageFileManager(getKeyByLink(users_detail.gateway_logo))
        await file.deleteFile()

        users_detail.gateway_logo = ''

        responseUtils.success(res, await users_detail.save())
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const update_main_settings = async (req: Request, res: Response) => {
    try {
        validation.update_main_settings(req.body)

        await MainGateWaySettings_Schema.findOneAndUpdate({
            user_id: res.locals.user_id
        }, {
            minimum_amount_of_support: req.body.minimum_amount_of_support,
            maximux_amount_of_support: req.body.maximux_amount_of_support,
            currency_support: req.body.currency_support,
            deposit_support_to_id: req.body.deposit_support_to_id,
            maximum_amount_of_payment_to_confirm_the_phone_number: req.body.maximum_amount_of_payment_to_confirm_the_phone_number,
            need_confirm_the_phone_number_before_payment: req.body.need_confirm_the_phone_number_before_payment,
            charity_id: req.body.charity_id,
            filter_unauthorized_words: req.body.filter_unauthorized_words,
            reqirement_data: {
                name: req.body.reqirement_data.name,
                details: req.body.reqirement_data.details,
                support_list: req.body.reqirement_data.support_list,
                phone_number: req.body.reqirement_data.phone_number,
                email: req.body.reqirement_data.email,
                terms_and_conditions: req.body.reqirement_data.terms_and_conditions,
                gift: req.body.reqirement_data.gift,
                show_target: req.body.reqirement_data.show_target
            },
            gateways: {
                zarinpal: {
                    code: req.body.gateways.zarinpal.code,
                    is_default: req.body.gateways.zarinpal.is_default,
                },
                idpay: {
                    code: req.body.gateways.idp.code,
                    is_default: req.body.gateways.idpay.is_default,
                },
                pardakhtpay: {
                    code: req.body.gateways.pardakhtpay.code,
                    is_default: req.body.gateways.pardakhtpay.is_default,
                },
                payping: {
                    code: req.body.gateways.payping.code,
                    is_default: req.body.gateways.payping.is_default,
                },
            }
        })

        const updated = await MainGateWaySettings_Schema.findOne({
            user_id: res.locals.user_id
        })

        responseUtils.success(res, updated)
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

export const get_main_settings = async (req: Request, res: Response) => {
    try {
        const main_settings = await MainGateWaySettings_Schema.findOne({
            user_id: res.locals.user_id
        })

        responseUtils.success(res, main_settings)
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}
