import {ObjectId} from "mongodb"

interface general_settings {
    measuring_the_content_of_the_tool_and_the_box: boolean;
}

interface target_background_box {
    show_background: boolean;
    background_color?: string;
    show_shadow?: boolean;
    radius?: number;
}

interface target_title {
    show_target_title: boolean;
    text_color?: string;
    title_text_format?: string;
    font_size?: number;
    show_text_shadow?: boolean;
}

interface target_progress_bar {
    show_progress_bar: boolean;
    bar_color?: string;
    bar_background_color?: string;
    bar_text_color?: string;
    font_size?: number;
    radius_of_holder_bar?: number;
    radius_of_inside_bar?: number;
    stroke_color?: string;
    bar_height?: number;
    min_width_of_process_bar?: number;
    to_advance_the_bar?: string;
}

interface target_detail {
    show_target_detail: boolean;
    text_color?: string;
    text_format_detail?: string;
    font_size?: number;
}

export interface tools_targart_appearanceSettings {
    _id?: ObjectId;
    user_id: ObjectId,
    general_settings: general_settings,
    target_background_box: target_background_box,
    target_title: target_title,
    target_progress_bar: target_progress_bar,
    target_detail: target_detail
}

export interface IToolsTargetAppearanceSettingsCreateInput extends Omit<tools_targart_appearanceSettings, "_id"> {}
export interface IToolsTargetAppearanceSettingsUpdateInput extends Omit<tools_targart_appearanceSettings, "user_id"> {}