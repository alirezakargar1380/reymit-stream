// Packages
import { Request, Response } from "express"

// Schema
import appearanceSettingsSchema from "../../models/gateway_appearance_settings.model"
import MainGateWayappearanceSettings_Schema from "../../models/gateway_appearance_settings.model"

// Utilitys
const responseUtils = require('./../../utils/response.utitlity');

// Vadidation
import validation from "../../validation/settings/appearance_settings.validation";


export const update_appearance_settings = async (req: Request, res: Response) => {
    try {
        validation.update_appearance_settings(req.body)

        await MainGateWayappearanceSettings_Schema.findOneAndUpdate({
            user_id: res.locals.user_id
        }, {
            background_pattern_image_link: req.body.background_pattern_image_link,
            background_image_link: req.body.background_image_link,
            first_color: req.body.first_color,
            second_color: req.body.second_color,
            twitch_account_username: req.body.twitch_account_username,
            show_link_in_stram: req.body.show_link_in_stram,
            social_media_inside_gateway_link: {
                facebook: req.body.social_media_inside_gateway_link.facebook,
                telegram: req.body.social_media_inside_gateway_link.telegram,
                youtube: req.body.social_media_inside_gateway_link.youtube,
                twitch: req.body.social_media_inside_gateway_link.twitch,
                instagram: req.body.social_media_inside_gateway_link.instagram,
                discord: req.body.social_media_inside_gateway_link.discord,
                aparat: req.body.social_media_inside_gateway_link.aparat,
            }
        })

        const update = await MainGateWayappearanceSettings_Schema.findOne({
            user_id: res.locals.user_id
        })

        responseUtils.success(res, update)
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const get_appearance_settings = async (req: Request, res: Response) => {
    try {
        const appearance_settings = await appearanceSettingsSchema.findOne({
            user_id: res.locals.user_id
        })

        responseUtils.success(res, appearance_settings)
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}