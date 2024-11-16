import { model, Schema } from "mongoose"
import {
    IToolsNewSupportSendEmojiSettings
} from "./../../../../shared/interfaces/tools/new_event_alert/send_emoji.interface"
import {send_emoji_placemants_constant} from "./../../../../shared/constants/schemas/tools/new_event_alert/send_emoji_placemants.constant"

export default model("tools.new_support_alert.send_emoji", new Schema<IToolsNewSupportSendEmojiSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    general_settings: {
        active: { type: Boolean, required: true, default: false },
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