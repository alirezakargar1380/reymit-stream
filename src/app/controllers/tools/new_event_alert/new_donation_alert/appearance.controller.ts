// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../../../utils/response.utitlity');

// INTEFACE
import {
    IToolsNewSupportAlertAppearanceSettingsUpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/appearance_settings.interface"

// Validation
import validation from "../../../../validation/tools/new_event_alert/new_support_alert/appearance.validation"

// Repository
import {
    toolsNewEventAlert_appearance_settingsRepository
} from "../../../../shared/config"

export const get_appearanceSettings = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, 
            await toolsNewEventAlert_appearance_settingsRepository.findByUserId(new ObjectId(res.locals.user_id))
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

export const update_appearanceSettings = async (req: Request, res: Response) => {
    try {
        let new_data: IToolsNewSupportAlertAppearanceSettingsUpdateInput = req.body
        validation.update(new_data)

        await toolsNewEventAlert_appearance_settingsRepository.updateByUserId(
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