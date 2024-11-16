import { ObjectId } from "mongodb"
import {
    toolsNewEventAlert_appearance_settingsRepository
} from "../../../shared/config"
import {
    horizonal_position_constant,
    vertical_position_constant
} from "./../../../shared/constants/schemas/tools/new_event_alert/position.constant"

export const create_default_setting = async (user_id: ObjectId) => {
    await toolsNewEventAlert_appearance_settingsRepository.create({
        user_id: user_id,
        appearance_profile_of_the_sponsor_profile_box: {
            horizonal_position_of_the_sponsor_profile_box: horizonal_position_constant.middle,
            vertical_position_of_the_sponsor_profile_box: vertical_position_constant.bottom,
            padding_bottom: 0,
            padding_left: 0,
            padding_right: 0,
            padding_top: 0
        }
    })
}
