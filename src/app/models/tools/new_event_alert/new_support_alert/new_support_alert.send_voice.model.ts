import { model, Schema } from "mongoose"
import {
    IToolsNewSupportSendVoiceSettings
} from "./../../../../shared/interfaces/tools/new_event_alert/send_voice.inteface"

export default model("tools.new_support_alert.send_voice", new Schema<IToolsNewSupportSendVoiceSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    voice_recording_settings: {
        active: { type: Boolean, required: true, default: false },
        max_voice_length: { type: Number, required: true, default: 10 },
        min_voice_length: { type: Number, required: true, default: 1 }, 
        volume: { type: Number, required: true, default: 100 }, 
        start_play_delay: { type: Number, required: true, default: 0 }, 
    }
}, {
    timestamps: true,
}))