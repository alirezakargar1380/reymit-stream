// PACKAGE
import { Request, Response } from "express"

// Repository
import {
    toolsTargetRepository,
    toolsNewEventAlert_Repository
} from "../../shared/config"

// Utils
const responseUtils = require('./../../utils/response.utitlity');

// constants
import { alertsSections_constant } from "./../../shared/constants/alerts/sections.constants"

import jwt from "../../utils/jwt.utils";
import { ObjectId } from "mongodb";
import Exception from "../../utils/error.utility";

export const get_overlay = async (req: Request, res: Response) => {
    try {
        const decoded: any = jwt.verify_token(req.query.key as string)

        if (decoded.section === alertsSections_constant.targets) {
            const target: any = await toolsTargetRepository.findByUserId(new ObjectId(decoded.user_id))
            if (target.key !== req.query.key as string) throw Exception.setError("this key is invalid", true)
            res.render("target", {
                socket: process.env.MAIN_WEBSITE_URL,
                address: process.env.MAIN_WEBSITE_URL
            })
        }

        if (decoded.section === alertsSections_constant.donation) {
            const donation:any = await toolsNewEventAlert_Repository.findByUserId(new ObjectId(decoded.user_id))
            if (donation.key !== req.query.key as string) throw Exception.setError("this key is invalid", true)
            res.render("notification", {
                socket: process.env.MAIN_WEBSITE_URL,
                address: process.env.MAIN_WEBSITE_URL
            })
        }

    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}