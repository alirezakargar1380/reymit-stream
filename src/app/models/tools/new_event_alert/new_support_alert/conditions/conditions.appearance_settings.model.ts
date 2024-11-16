import { model, Schema } from "mongoose"
import {
    change_status_of_this_section_for_this_condition
} from "./../../../../../shared/constants/schemas/tools/new_event_alert/new_support_alert/change_status_of_this_section_for_this_condition.constants"
import {
    file_selection_method_constant
} from "./../../../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "./../../../../../shared/constants/schemas/tools/tools.file_type.constant"

// interface
import {
    IToolsConditions_AppearanceSettings
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.appearance_settings.interface"

export default model("tools.new_event_alert.new_support_alert.conditions.appearance_settings", new Schema<IToolsConditions_AppearanceSettings>({
    condition_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'tools.new_event_alert.new_support_alert.conditions' },
    appearance_profile_of_the_sponsor_profile_box: {
        change_status_of_this_section_for_this_condition: {
            type: String,
            required: true,
            enum: change_status_of_this_section_for_this_condition,
            default: change_status_of_this_section_for_this_condition.without_change,
        },
        // FILE
        file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.file_direct_link },
        file_type: { type: String, required: true, enum: file_type_constant, default: file_type_constant.photo },
        link_or_name_of_file: { type: String, required: false, default: '' },
    }
}, {
    timestamps: true,
}))