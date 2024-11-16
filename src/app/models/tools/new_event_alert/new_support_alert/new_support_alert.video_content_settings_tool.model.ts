import { model, Schema } from "mongoose"
import {
    file_selection_method_constant
} from "./../../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "./../../../../shared/constants/schemas/tools/tools.file_type.constant"
import {
    IToolsNewSupportAlertVideoContentSettingsTool
} from "./../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.interface"

export default model("tools.new_support_alert.video_content_settings_tool", new Schema<IToolsNewSupportAlertVideoContentSettingsTool>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    background_content_sponsor_profile: {
        file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.file_direct_link },
        file_type: { type: String, required: true, enum: file_type_constant, default: file_type_constant.photo },
        link_or_name_of_file: { type: String, required: false, default: '' },
    },
    content_below_sponsor_profile: {
        file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.no_content },
        file_type: { type: String, required: false, enum: file_type_constant },
        link_or_name_of_file: { type: String, required: false, default: '' },
    },
    other_location_for_placemant_of_content: {
        top_content_sponsor_profile: {
            file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.no_content },
            file_type: { type: String, required: false, enum: file_type_constant },
            link_or_name_of_file: { type: String, required: false, default: '' },
        },
        right_content_sponsor_profile: {
            file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.no_content },
            file_type: { type: String, required: false, enum: file_type_constant },
            link_or_name_of_file: { type: String, required: false, default: '' },
        },
        left_content_sponsor_profile: {
            file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.no_content },
            file_type: { type: String, required: false, enum: file_type_constant },
            link_or_name_of_file: { type: String, required: false, default: '' },
        },
        bottom_content_sponsor_profile: {
            file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.no_content },
            file_type: { type: String, required: false, enum: file_type_constant },
            link_or_name_of_file: { type: String, required: false, default: '' },
        },
    }
}, {
    timestamps: true,
}))