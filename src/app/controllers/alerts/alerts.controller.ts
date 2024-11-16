// PACKAGE
import { Request, Response } from "express"
import { ObjectId } from "mongodb"

// Utils
const responseUtils = require('./../../utils/response.utitlity');
import Exception from "../../utils/error.utility";

// Repository
import {
    toolsTargetRepository
} from "../../shared/config"
import { IToolsTarget, IToolsTargetCreateInput } from "./../../shared/interfaces/tools/target/tools.target.interface"
import * as alertService from "./../../services/alerts/alerts.service"
import * as socketService from "./../../services/socket/socket.service"
import alertsValidation from "./../../validation/alerts/alerts.validation"

export const send_notification = async (req: Request, res: Response) => {
    try {
        alertsValidation.send_notification(req.body)
        socketService.donation_alert(res.locals.user_id, {
            test: true,
            details: "این یک اعلان تست است",
            donation_name: "test",
            amount: req.body.amount,
            publishDesc: true,
            publishName: true
        })
        responseUtils.success(res, "sended")
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

// export const get_tools = async (req: Request, res: Response) => {
//     try {
//         res.render("notification", {
//             socket: process.env.MAIN_WEBSITE_URL,
//             address: process.env.MAIN_WEBSITE_URL
//         })
//     } catch (e: any) {
//         console.log(e)
//         if (e.extensions) {
//             responseUtils.error(res, e.extensions)
//         } else {
//             responseUtils.error(res, "internal server error")
//         }
//     }
// }

export const get_alert_link = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, await alertService.get_alert_link(res.locals.user_id))
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const get_target_link = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, await alertService.get_target_link(res.locals.user_id))
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const void_link_key_and_make_new_one = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, await alertService.void_alertLink_key_and_make_new_one(new ObjectId(res.locals.user_id)))
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const void_target_Link_key_and_make_new_one = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res, await alertService.void_targetLink_key_and_make_new_one(new ObjectId(res.locals.user_id)))
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}