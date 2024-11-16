// PACKAGE
import { Request, Response } from "express"
import {ObjectId} from "mongodb"

// Utils
const responseUtils = require('./../../../utils/response.utitlity');
import Exception from "./../../../utils/error.utility";

// Repository
import {
    toolsTargetMainSettingsRepository
} from "./../../../shared/config"

// service
import * as socketService from "./../../../services/socket/socket.service"

// interface
import {
    tools_target_mainSettings
} from "./../../../shared/interfaces/tools/target/tools.target.main_settings.interface"
import toolsTargetMainSettingsDefaults from "./../../../shared/default/settings/tools/target/main_settings.default"

// validation
import validation_main_settings from "./../../../validation/tools/target/main_settings.validation"

export const get_tools_target_main_settings = async (req: Request, res: Response) => {
    try {
        const user_id: ObjectId = new ObjectId(res.locals.user_id)
        
        responseUtils.success(res,
            await toolsTargetMainSettingsRepository.findByUserId(user_id)
        )
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const update_tools_target_main_settings = async (req: Request, res: Response) => {
    try {
        validation_main_settings.update_main_settings(req.body)

        const user_id: ObjectId = new ObjectId(res.locals.user_id)
        const targetMainSettings: tools_target_mainSettings | null = await toolsTargetMainSettingsRepository.findByUserId(user_id)
        if (!targetMainSettings) throw Exception.setError("tools.target.main_settings.not_found", true)

        // update data
        targetMainSettings.active = req.body.active
        targetMainSettings.show_target = req.body.show_target
        targetMainSettings.target_title = req.body.target_title
        targetMainSettings.target_amount = req.body.target_amount
        targetMainSettings.amount_until_now = req.body.amount_until_now

        // send setting to user
        socketService.toolsTargetMainSettings(res.locals.user_id, targetMainSettings)

        await toolsTargetMainSettingsRepository.updateByUserId(user_id, targetMainSettings)

        responseUtils.success(res, targetMainSettings)
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const reset_tools_target_main_settings = async (req: Request, res: Response) => {
    try {
        const user_id: ObjectId = new ObjectId(res.locals.user_id)
        const targetMainSettings: tools_target_mainSettings | null = await toolsTargetMainSettingsRepository.findByUserId(user_id)
        if (!targetMainSettings) throw Exception.setError("tools.target.main_settings.not_found", true)

        // RESET DATA FOR SETTINGS
        targetMainSettings.active = toolsTargetMainSettingsDefaults.active
        targetMainSettings.show_target = toolsTargetMainSettingsDefaults.show_target
        targetMainSettings.target_title = toolsTargetMainSettingsDefaults.target_title
        targetMainSettings.target_amount = toolsTargetMainSettingsDefaults.target_amount
        targetMainSettings.amount_until_now = toolsTargetMainSettingsDefaults.amount_until_now
        
        await toolsTargetMainSettingsRepository.updateByUserId(user_id, targetMainSettings)

        responseUtils.success(res, "data was reseted")
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}