import { ObjectId } from "mongodb"
import {
    toolsNewEventAlert_Repository
} from "../../../shared/config"

import JWT from "./../../../utils/jwt.utils"
 
// constants
import {alertsSections_constant} from "./../../../shared/constants/alerts/sections.constants"

export const create_default_setting = async (user_id: ObjectId) => {
    const token: string = JWT.alert_key({
        user_id: user_id,
        section: alertsSections_constant.donation
    })

    await toolsNewEventAlert_Repository.create({
        user_id: user_id,
        key: token
    })
}