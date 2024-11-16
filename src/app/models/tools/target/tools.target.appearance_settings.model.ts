import { model, Schema } from "mongoose"
import {to_advance_the_bar} from "../../../shared/constants/schemas/tools/target/tools.target.appearance_settings.constant"
import {tools_targart_appearanceSettings} from "../../../shared/interfaces/tools/target/tools.target.appearance_settings.interface"

/**
 *  TODO:
 *     - add default values 
 */

export default model("tools.targart.appearance_settings", new Schema<tools_targart_appearanceSettings>({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    general_settings: {
        measuring_the_content_of_the_tool_and_the_box: { type: Boolean, required: true, default: false },
    },
    target_background_box: {
        show_background: { type: Boolean, required: true, default: true },
        background_color: { type: String, required: true, default: '#ffffff' },
        show_shadow: { type: Boolean, required: true, default: true },
        radius: { type: Number, required: true, default: 10 },
    },
    target_title: {
        show_target_title: { type: Boolean, required: true, default: true },
        text_color: { type: String, required: true, default: '#ffffff' },
        title_text_format: { type: String, required: true, default: '<NAME>' },
        font_size: { type: Number, required: true, default: 16 },
        show_text_shadow: { type: Boolean, required: true, default: false },
    },
    target_progress_bar: {
        show_progress_bar: { type: Boolean, required: true, default: true },
        bar_color: { type: String, required: true, default: '#ffffff' },
        bar_background_color: { type: String, required: true, default: '#ffffff' },
        bar_text_color: { type: String, required: true, default: '#ffffff' },
        font_size: { type: Number, required: true, default: 16 },
        radius_of_holder_bar: { type: Number, required: true, default: 10 },
        radius_of_inside_bar: { type: Number, required: true, default: 10 },
        stroke_color: { type: String, required: true, default: '#ffffff' },
        bar_height: { type: Number, required: true, default: 20 },
        min_width_of_process_bar: { type: Number, required: true, default: 30 },
        to_advance_the_bar: { type: String, required: true, enum: to_advance_the_bar, default: to_advance_the_bar.right_to_left },
    },
    target_detail: {
        show_target_detail: { type: Boolean, required: true, default: true },
        text_color: { type: String, required: true, default: '#ffffff' },
        text_format_detail: { type: String, required: true, default: '<NAME>' },
        font_size: { type: Number, required: true, default: 16 },
    }
}))