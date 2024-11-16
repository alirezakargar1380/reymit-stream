// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../../../utils/response.utitlity');

// INTEFACE
import {
    IToolsNewSupportAlertSendVoiceSettingsUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/send_voice.inteface"

// Validation
import validation from "../../../../validation/tools/new_event_alert/new_support_alert/sendVoice.validation"

// Repository
import {
    toolsNewEventAlert_sendVoice_Repository
} from "../../../../shared/config"

/**
 *    @TODO:
 *       - adding File uploader
 */

export const get_sendVoice = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, 
            await toolsNewEventAlert_sendVoice_Repository.findByUserId(new ObjectId(res.locals.user_id))
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

export const update_sendVoice = async (req: Request, res: Response) => {
    try {
        let new_data: IToolsNewSupportAlertSendVoiceSettingsUpdateInput = req.body
        validation.update(req.body)

        await toolsNewEventAlert_sendVoice_Repository.updateByUserId(
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