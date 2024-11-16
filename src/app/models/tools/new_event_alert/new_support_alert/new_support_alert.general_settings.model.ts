import { model, Schema } from "mongoose"
import {
    file_selection_method_constant
} from "./../../../../shared/constants/schemas/tools/tools.file_selection_method.constant"
import {
    file_type_constant
} from "./../../../../shared/constants/schemas/tools/tools.file_type.constant"

import {IToolsNewSupportAlertGeneralSettings} from "./../../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.general_settings"

export default model("tools.new_support_alert.general_settings", new Schema<IToolsNewSupportAlertGeneralSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    new_donate_alert_sound: {
        file_selection_method: { type: String, required: true, enum: file_selection_method_constant, default: file_selection_method_constant.file_direct_link },
        link_or_name_of_file: { type: String, required: false, default: '' },
        sound_volume: { type: Number, required: false, default: 0 },
    },
    timing: {
        alert_show_time: { type: Number, required: true, default: 10 },
        alert_delay_time: { type: Number, required: true, default: 0 },
        show_delay_sponser_details: { type: Number, required: true, default: 0 },
    },
    sponser_descreption: {
        show_sponser_description: { type: Boolean, required: true, default: false },
    },
    video_content: {
        limit_the_height_and_width_of_video_content: { type: Boolean, required: true, default: false },
    }
}, {
    timestamps: true,
}))