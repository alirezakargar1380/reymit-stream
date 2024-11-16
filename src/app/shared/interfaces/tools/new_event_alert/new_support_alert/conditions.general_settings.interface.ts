import { ObjectId } from "mongodb"

export interface IToolsConditions_GeneralSettings {
    _id: ObjectId
    condition_id: ObjectId
    new_donate_alert_sound: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        link_or_name_of_file: String
        sound_volume: Number
    }
    timing: {
        change_status_of_this_section_for_this_condition: String
        alert_show_time: Number
        alert_delay_time: Number
        show_delay_sponser_details: Number
    }
}

export interface IToolsConditions_GeneralSettings_CreateInput extends Omit<IToolsConditions_GeneralSettings, "_id"> {}
export interface IToolsConditions_GeneralSettings_UpdateInput extends Omit<IToolsConditions_GeneralSettings, "_id"> {}