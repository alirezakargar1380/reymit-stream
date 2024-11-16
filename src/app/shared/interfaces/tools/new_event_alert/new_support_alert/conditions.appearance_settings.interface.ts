import { ObjectId } from "mongodb"

export interface IToolsConditions_AppearanceSettings {
    _id: ObjectId
    condition_id: ObjectId
    appearance_profile_of_the_sponsor_profile_box: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method?: String
        file_type?: String
        link_or_name_of_file?: String
    }
}

export interface IToolsConditions_AppearanceSettings_CreateInput extends Omit<IToolsConditions_AppearanceSettings, "_id"> {}
export interface IToolsConditions_AppearanceSettings_UpdateInput extends Omit<IToolsConditions_AppearanceSettings, "_id"> {}