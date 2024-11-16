import { model, Schema } from "mongoose"
import {
    horizonal_position_constant,
    vertical_position_constant
} from "./../../../../shared/constants/schemas/tools/new_event_alert/position.constant"

import {
    IToolsNewSupportAlertAppearanceSettings
} from "./../../../../shared/interfaces/tools/new_event_alert/appearance_settings.interface"

export default model("tools.new_support_alert.appearance_settings", new Schema<IToolsNewSupportAlertAppearanceSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    appearance_profile_of_the_sponsor_profile_box: {
        vertical_position_of_the_sponsor_profile_box: {
            type: String, required: true, enum: vertical_position_constant
        },
        horizonal_position_of_the_sponsor_profile_box: {
            type: String, required: true, enum: horizonal_position_constant
        },
        padding_top: { type: Number, required: true, default: 0},
        padding_right: { type: Number, required: true, default: 0},
        padding_bottom: { type: Number, required: true, default: 0},
        padding_left: { type: Number, required: true, default: 0},
    }
}, {
    timestamps: true,
}))