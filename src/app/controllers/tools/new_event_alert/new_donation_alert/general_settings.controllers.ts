// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../../../utils/response.utitlity');

// INTEFACE
import {
    IToolsNewSupportAlertGeneralSettingsUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.general_settings"

// Validation
import validation from "../../../../validation/tools/new_event_alert/new_support_alert/general_settings.validation"

// Repository
import {
    toolsNewEventAlert_general_settingsRepository
} from "../../../../shared/config"

/**
 *    @TODO:
 *       - adding File uploader
 *       - check if user upload a file in aws before, remove it   
 */

export const get_general_settings = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, 
            await toolsNewEventAlert_general_settingsRepository.findByUserId(new ObjectId(res.locals.user_id))
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

export const update_general_settings = async (req: Request, res: Response) => {
    try {
        let new_data: IToolsNewSupportAlertGeneralSettingsUpdateInput = req.body
        validation.update(new_data)

        await toolsNewEventAlert_general_settingsRepository.updateByUserId(new ObjectId(res.locals.user_id), new_data)

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