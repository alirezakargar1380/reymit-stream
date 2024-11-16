// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../../../utils/response.utitlity');

// INTEFACE
import {
    IToolsNewSupportAlertSendEmojiSettingsUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/send_emoji.interface"

// Validation
import validation from "../../../../validation/tools/new_event_alert/new_support_alert/sendEmoji.validation"

// Repository
import {
    toolsNewEventAlert_sendEmoji_Repository
} from "../../../../shared/config"

export const get_sendEmoji = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, 
            await toolsNewEventAlert_sendEmoji_Repository.findByUserId(new ObjectId(res.locals.user_id))
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

export const update_sendEmoji = async (req: Request, res: Response) => {
    try {
        let new_data: IToolsNewSupportAlertSendEmojiSettingsUpdateInput = req.body
        validation.update(new_data)

        await toolsNewEventAlert_sendEmoji_Repository.updateByUserId(
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