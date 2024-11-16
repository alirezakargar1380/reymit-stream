import { model, Schema } from "mongoose"
import {tools_target_mainSettings} from "./../../../shared/interfaces/tools/target/tools.target.main_settings.interface"
import defaults from "./../../../shared/default/settings/tools/target/main_settings.default"

export default model("tools.targart.main_settings", new Schema<tools_target_mainSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    active: { type: Boolean, required: true, default: defaults.active },
    show_target: { type: Boolean, required: true, default: defaults.show_target },
    target_title: { type: String, required: false, default: defaults.target_title },
    target_amount: { type: Number, required: true, default: defaults.target_amount },
    amount_until_now: { type: Number, required: true, default: defaults.amount_until_now },
}, {
    timestamps: true
}))