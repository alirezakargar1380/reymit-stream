import { ObjectId } from "mongodb"
import {
    toolsNewEventAlert_sendEmoji_Repository
} from "../../../shared/config"
import {send_emoji_placemants_constant} from "./../../../shared/constants/schemas/tools/new_event_alert/send_emoji_placemants.constant"

export const create_default_setting = async (user_id: ObjectId) => {
    await toolsNewEventAlert_sendEmoji_Repository.create({
        user_id: user_id,
        general_settings: {
            active: false,
            placemant_position: send_emoji_placemants_constant.bottom_of_the_content
        }
    })
}
