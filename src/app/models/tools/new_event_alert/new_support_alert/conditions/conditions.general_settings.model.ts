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
    IToolsConditions_GeneralSettings
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.general_settings.interface"

export default model("tools.new_event_alert.new_support_alert.conditions.general_settings", new Schema<IToolsConditions_GeneralSettings>({
    condition_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'tools.new_event_alert.new_support_alert.conditions' },
    new_donate_alert_sound: {
        change_status_of_this_section_for_this_condition: { 
            type: String,
            required: true,
            enum: change_status_of_this_section_for_this_condition,
            default: change_status_of_this_section_for_this_condition.without_change,
        },
        file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.file_direct_link },
        link_or_name_of_file: { type: String, required: false, default: '' },
        sound_volume: { type: Number, required: false, default: 0 },
    },
    timing: {
        change_status_of_this_section_for_this_condition: { 
            type: String,
            required: true,
            enum: change_status_of_this_section_for_this_condition,
            default: change_status_of_this_section_for_this_condition.without_change,
        },
        alert_show_time: { type: Number, required: true, default: 10 },
        alert_delay_time: { type: Number, required: true, default: 0 },
        show_delay_sponser_details: { type: Number, required: true, default: 0 },
    },

}, {
    timestamps: true,
}))