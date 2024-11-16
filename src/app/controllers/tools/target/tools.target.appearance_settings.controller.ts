// PACKAGE
import { Request, Response } from "express"
import {ObjectId} from "mongodb"

// Utils
const responseUtils = require('./../../../utils/response.utitlity');
import Exception from "../../../utils/error.utility";

// Repository
import {
    toolsTargetAppearanceSettingsRepository
} from "../../../shared/config"

// interface
import {
    tools_targart_appearanceSettings
} from "../../../shared/interfaces/tools/target/tools.target.appearance_settings.interface"

// validation
import validation_appearance_settings from "../../../validation/tools/target/appearance_settings.validation"

// service
import * as socketService from "./../../../services/socket/socket.service"

export const get_tools_appearance_settings = async (req: Request, res: Response) => {
    try {
        const user_id: ObjectId = new ObjectId(res.locals.user_id)

        responseUtils.success(res, 
            await toolsTargetAppearanceSettingsRepository.findByUserId(user_id)
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

export const update_tools_appearance_settings = async (req: Request, res: Response) => {
    try {
        validation_appearance_settings.update_appearance_settings(req.body)
        
        const user_id: ObjectId = new ObjectId(res.locals.user_id)

        const appearanceSettings: tools_targart_appearanceSettings | null = await toolsTargetAppearanceSettingsRepository.findByUserId(user_id)
        if (!appearanceSettings) throw Exception.setError("tools.target.appearance_settings.not_found", true)

        // update data
        appearanceSettings.general_settings.measuring_the_content_of_the_tool_and_the_box = req.body.general_settings.measuring_the_content_of_the_tool_and_the_box
        
        appearanceSettings.target_background_box.show_background = req.body.target_background_box.show_background
        appearanceSettings.target_background_box.background_color = req.body.target_background_box.background_color
        appearanceSettings.target_background_box.show_shadow = req.body.target_background_box.show_shadow
        appearanceSettings.target_background_box.radius = req.body.target_background_box.radius

        appearanceSettings.target_title.show_target_title = req.body.target_title.show_target_title
        appearanceSettings.target_title.text_color = req.body.target_title.text_color
        appearanceSettings.target_title.title_text_format = req.body.target_title.title_text_format
        appearanceSettings.target_title.font_size = req.body.target_title.font_size
        appearanceSettings.target_title.show_text_shadow = req.body.target_title.show_text_shadow

        appearanceSettings.target_progress_bar.show_progress_bar = req.body.target_progress_bar.show_progress_bar
        appearanceSettings.target_progress_bar.bar_color = req.body.target_progress_bar.bar_color
        appearanceSettings.target_progress_bar.bar_background_color = req.body.target_progress_bar.bar_background_color
        appearanceSettings.target_progress_bar.bar_text_color = req.body.target_progress_bar.bar_text_color
        appearanceSettings.target_progress_bar.font_size = req.body.target_progress_bar.font_size
        appearanceSettings.target_progress_bar.radius_of_holder_bar = req.body.target_progress_bar.radius_of_holder_bar
        appearanceSettings.target_progress_bar.radius_of_inside_bar = req.body.target_progress_bar.radius_of_inside_bar
        appearanceSettings.target_progress_bar.bar_height = req.body.target_progress_bar.bar_height
        appearanceSettings.target_progress_bar.min_width_of_process_bar = req.body.target_progress_bar.min_width_of_process_bar
        appearanceSettings.target_progress_bar.stroke_color = req.body.target_progress_bar.stroke_color
        appearanceSettings.target_progress_bar.to_advance_the_bar = req.body.target_progress_bar.to_advance_the_bar

        appearanceSettings.target_detail.show_target_detail = req.body.target_detail.show_target_detail
        appearanceSettings.target_detail.text_color = req.body.target_detail.text_color
        appearanceSettings.target_detail.text_format_detail = req.body.target_detail.text_format_detail
        appearanceSettings.target_detail.font_size = req.body.target_detail.font_size

        console.log(appearanceSettings.target_detail.show_target_detail)

        socketService.toolsTargets_appearanceSettings(res.locals.user_id, appearanceSettings)

        await toolsTargetAppearanceSettingsRepository.updateByUserId(user_id, appearanceSettings)

        responseUtils.success(res, appearanceSettings)
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}