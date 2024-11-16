import { ObjectId } from "mongodb"
import {
    toolsNewEventAlert_general_settingsRepository
} from "../../../shared/config"
import {
    file_selection_method_constant
} from "./../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "./../../../shared/constants/schemas/tools/tools.file_type.constant"

export const create_default_setting = async (user_id: ObjectId) => {
    await toolsNewEventAlert_general_settingsRepository.create({
        user_id: user_id,
        new_donate_alert_sound: {
            file_selection_method: file_selection_method_constant.file_direct_link,
            link_or_name_of_file: `${process.env.MAIN_WEBSITE_URL}/assets/coin.mp3`,
            sound_volume: 100
        },
        sponser_descreption: {
            show_sponser_description: false
        },
        timing: {
            alert_delay_time: 0,
            alert_show_time: 5,
            show_delay_sponser_details: 0
        },
        video_content: {
            limit_the_height_and_width_of_video_content: false
        }
    })
}
