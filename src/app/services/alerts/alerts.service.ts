// Repository
import {
    toolsTargetRepository,
    toolsNewEventAlert_Repository
} from "../../shared/config"
import {ObjectId} from "mongodb"

import Exception from "../../utils/error.utility";
import jwt from "../../utils/jwt.utils";
import {IToolsTarget, IToolsTargetCreateInput} from "./../../shared/interfaces/tools/target/tools.target.interface"
import {IToolsNewEventAlert} from "./../../shared/interfaces/tools/new_event_alert/new_event_alerts.interface"

// constants
import {alertsSections_constant} from "./../../shared/constants/alerts/sections.constants"

export const get_alert_link = async (user_id: ObjectId): Promise<any> => {
    const d: IToolsNewEventAlert | null = await toolsNewEventAlert_Repository.findByUserId(new ObjectId(user_id))
    if (!d) throw Exception.setError("not found!", true)

    return {
        link: `${process.env.MAIN_WEBSITE_URL}/api/overlay/?key=${d.key}`,
        key: d.key
    }
}

export const void_alertLink_key_and_make_new_one = async (user_id: ObjectId): Promise<any> => {
    const token: string = jwt.alert_key({
        user_id: user_id,
        section: alertsSections_constant.donation
    })

    await toolsNewEventAlert_Repository.updateByUserId(user_id, { key: token })
    
    return {
        link: `${process.env.MAIN_WEBSITE_URL}/api/overlay/?key=${token}`,
        key: token
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////////// TARGETS

export const get_target_link = async (user_id: ObjectId): Promise<any> => {
    const t: IToolsTarget | null = await toolsTargetRepository.findByUserId(new ObjectId(user_id))
    if (!t) throw Exception.setError("not found!", true)

    return {
        link: `${process.env.MAIN_WEBSITE_URL}/api/overlay/?key=${t.key}`,
        key: t.key
    }
}

export const void_targetLink_key_and_make_new_one = async (user_id: ObjectId): Promise<any> => {
    const token: string = jwt.alert_key({
        user_id: user_id,
        section: alertsSections_constant.targets
    })

    await toolsTargetRepository.updateByUserId(user_id, { key: token })
    
    return {
        link: `${process.env.MAIN_WEBSITE_URL}/api/overlay/?key=${token}`,
        key: token
    }
}