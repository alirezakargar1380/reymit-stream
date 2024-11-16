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
    IToolsConditions_SendVoiceSettings
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.send_voice.interface"

export default model("tools.new_event_alert.new_support_alert.conditions.send_voice", new Schema<IToolsConditions_SendVoiceSettings>({
    condition_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'tools.new_event_alert.new_support_alert.conditions' },
    general_settings: {
        change_status_of_this_section_for_this_condition: {
            type: String,
            required: true,
            enum: change_status_of_this_section_for_this_condition,
            default: change_status_of_this_section_for_this_condition.without_change,
        },
        alert_delay_time: { type: Number, required: true, default: 0 },
        volume: { type: Number, required: true, default: 100 }
    }
}, {
    timestamps: true,
}))