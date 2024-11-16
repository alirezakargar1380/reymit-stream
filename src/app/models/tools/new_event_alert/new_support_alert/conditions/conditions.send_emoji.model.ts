import { model, Schema } from "mongoose"
import {
    change_status_of_this_section_for_this_condition
} from "./../../../../../shared/constants/schemas/tools/new_event_alert/new_support_alert/change_status_of_this_section_for_this_condition.constants"
import {send_emoji_placemants_constant} from "./../../../../../shared/constants/schemas/tools/new_event_alert/send_emoji_placemants.constant"

// interface
import {
    IToolsConditions_SendEmoji
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.send_emoji.interface"

export default model("tools.new_event_alert.new_support_alert.conditions.send_emoji", new Schema<IToolsConditions_SendEmoji>({
    condition_id: { type: Schema.Types.ObjectId, required: true, unique: true, ref: 'tools.new_event_alert.new_support_alert.conditions' },
    general_settings: {
        change_status_of_this_section_for_this_condition: {
            type: String,
            required: true,
            enum: change_status_of_this_section_for_this_condition,
            default: change_status_of_this_section_for_this_condition.without_change,
        },
        placemant_position: { 
            type: String,
            required: true,
            enum: send_emoji_placemants_constant,
            default: send_emoji_placemants_constant.top_of_the_content
        },
    }
}, {
    timestamps: true,
}))