// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../../../utils/response.utitlity');
import Exception from "../../../../utils/error.utility";

// INTEFACE
import {
    IToolsNewSupportAlertVideoContentSettingsToolUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.interface"

// Validation
import validation from "../../../../validation/tools/new_event_alert/new_support_alert/video_content_settings_tool.validation"

// Repository
import {
    toolsNewEventAlertVideoContent_settings_content_settingsRepository
} from "../../../../shared/config"

/**
 *    @TODO:
 *       - adding File uploader
 */

export const get_videoContentSettingsTool = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, 
            await toolsNewEventAlertVideoContent_settings_content_settingsRepository.findByUserId(new ObjectId(res.locals.user_id))
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

export const update_videoContentSettingsTool = async (req: Request, res: Response) => {
    try {
        let new_data: IToolsNewSupportAlertVideoContentSettingsToolUpdateInput = req.body
        validation.update(new_data)

        await toolsNewEventAlertVideoContent_settings_content_settingsRepository.updateByUserId(
            new ObjectId(res.locals.user_id),
            new_data
        )

        responseUtils.success(res, new_data)

    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}