import { ObjectId } from "mongodb"
import {
    toolsNewEventAlertVideoContent_settings_content_settingsRepository
} from "./../../../shared/config"
import {
    file_selection_method_constant
} from "./../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "./../../../shared/constants/schemas/tools/tools.file_type.constant"

export const create_default_setting = async (user_id: ObjectId) => {
    await toolsNewEventAlertVideoContent_settings_content_settingsRepository.create({
        user_id: user_id,
        background_content_sponsor_profile: {
            file_selection_method: file_selection_method_constant.file_direct_link,
            file_type: file_type_constant.photo,
            link_or_name_of_file: `${process.env.MAIN_WEBSITE_URL}/assets/stream%20donation.png`
        },
        content_below_sponsor_profile: {
            file_selection_method: file_selection_method_constant.no_content
        },
        other_location_for_placemant_of_content: {
            bottom_content_sponsor_profile: {
                file_selection_method: file_selection_method_constant.no_content
            },
            left_content_sponsor_profile: {
                file_selection_method: file_selection_method_constant.no_content
            },
            right_content_sponsor_profile: {
                file_selection_method: file_selection_method_constant.no_content
            }, 
            top_content_sponsor_profile: {
                file_selection_method: file_selection_method_constant.no_content
            }
        }
    })
}
