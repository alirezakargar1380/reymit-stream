// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"
import multer from "multer";

// Utils
const responseUtils = require('./../../../../../utils/response.utitlity');
import Exception from "./../../../../../utils/error.utility";

// INTEFACE
// import {
//     IToolsNewSupportAlertAppearanceSettingsUpdateInput
// } from "./../../../../../shared/interfaces/tools/new_event_alert/appearance_settings.interface"
import { EUserActivites_Sections } from "./../../../../../shared/interfaces/user_activites.interface";
import {IUploadFileStorage} from "./../../../../../shared/interfaces/files/storage.interface"

// Repository
import {
    tools_newEventAlert_newDonationAlert_conditions_repository,
    toolsNewEventAlert_general_settingsRepository,
    toolsNewEventAlertVideoContent_settings_content_settingsRepository,
} from "./../../../../../shared/config"

// Service
import * as conditionService from "./../../../../../services/tools/new_event_alert/new_support_alert/conditions.service"
import { file_manager } from "./../../../../../services/file/file_manager"
import * as activityService from './../../../../../services/users/user_activites.service'
import log from "../../../../../utils/log.utility";

import * as socketService from "./../../../../../services/socket/socket.service"

// CONFIGURATION
const upload = multer({
    limits: {
        fileSize: 20 * 1024 * 1024, // IT'S TEST
    }
}).single('image')

/**
 *    @TODO:
 *       - adding File uploader
 */

export const add_condition = async (req: Request, res: Response) => {
    try {
        req.body.user_id = new ObjectId(res.locals.user_id)
        responseUtils.success(res, await conditionService.create_condition(req.body))
    } catch (e: any) {
        console.log(e)
        if (e.code === 11000) {
            if (e.keyValue.amount)
                return responseUtils.error(res, "this amount was set before")
        }
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const uploader = async (req: Request, res: Response) => {
    try {
        upload(req, res, async function (err) {
            try {
                if (err) {
                    console.log(err)
                    return res.status(400).json({
                        success: false,
                        message: "upload was failed"
                    })
                }

                if (!req.file) throw Exception.setError("Please select a file", true)

                // NOT COMPLETE YET
                // const fileManager = new file_manager({ mimetype: req.file.mimetype as string })
                // await fileManager.delete_previous_file(res.locals.user_id, EUserActivites_Sections.upload_mp3_on_condition_newDonationAlertSound)
                // let imageUrl: IUploadFile = await fileManager.create(req.file.buffer as {})

                // // ACTIVITY
                // await activityService.add_activity({
                //     user_id: res.locals.user_id,
                //     section: EUserActivites_Sections.upload_mp3_on_condition_newDonationAlertSound,
                //     data: imageUrl.key
                // })

                // responseUtils.success(res, {
                //     url: imageUrl.location
                // })
            } catch (e: any) {
                console.log(e)
                if (e.extensions) {
                    responseUtils.error(res, e.extensions)
                } else {
                    responseUtils.error(res, "internal server error")
                }
            }
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

export const get_condition_byId = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res,
            await tools_newEventAlert_newDonationAlert_conditions_repository.getConditionById(
                new ObjectId("62aed7171b22341ad759d6f1"),
                new ObjectId("62b53ba90dce3671d401869a")
            )
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

export const get_conditions_byUserId = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res,
            await tools_newEventAlert_newDonationAlert_conditions_repository.findByUserId(
                new ObjectId("62aed7171b22341ad759d6f1")
            )
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

export const update_conditions = async (req: Request, res: Response) => {
    try {
        req.body.user_id = "62aed7171b22341ad759d6f1"
        await conditionService.checkConditionUser(new ObjectId(req.body._id), new ObjectId("62aed7171b22341ad759d6f1"))
        await conditionService.update_conditions(req.body)
        responseUtils.success(res,
            await tools_newEventAlert_newDonationAlert_conditions_repository.getConditionById(
                new ObjectId("62aed7171b22341ad759d6f1"),
                new ObjectId(req.body._id)
            )
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

export const delete_conditions = async (req: Request, res: Response) => {
    try {
        await conditionService.checkConditionUser(new ObjectId("62b53ba90dce3671d401869a"), new ObjectId("62aed7171b22341ad759d6f1"))
        await conditionService.delete_condition(new ObjectId("62b53ba90dce3671d401869a"))
        responseUtils.success(res, "")
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}
