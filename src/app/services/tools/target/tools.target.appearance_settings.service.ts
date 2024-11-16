import { ObjectId } from "mongodb"
// REPOSITORY
import {
    toolsTargetAppearanceSettingsRepository,
} from "./../../../shared/config";

export const create_default_setting = async (user_id: ObjectId): Promise<void> => {
    await toolsTargetAppearanceSettingsRepository.create({
        user_id: user_id,
        general_settings: {
            measuring_the_content_of_the_tool_and_the_box: false
        },
        target_background_box: {
            show_background: false
        },
        target_detail: {
            show_target_detail: false
        },
        target_progress_bar: {
            show_progress_bar: false,
        },
        target_title: {
            show_target_title: false
        }
    })
}
