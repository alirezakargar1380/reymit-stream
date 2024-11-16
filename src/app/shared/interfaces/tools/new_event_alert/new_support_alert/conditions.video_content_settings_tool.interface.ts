import { ObjectId } from "mongodb"

export interface IToolsConditions_VideoContentSettings {
    _id?: ObjectId
    condition_id: ObjectId
    background_content_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
    content_top_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
    content_below_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
    content_right_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
    content_left_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
    content_bottom_sponsor_profile: {
        change_status_of_this_section_for_this_condition: String
        file_selection_method: String
        file_type: String
        link_or_name_of_file: String
    }
}

export interface IToolsConditions_VideoContentSettings_CreateInput extends Omit<IToolsConditions_VideoContentSettings, "_id"> {}
export interface IToolsConditions_VideoContentSettings_UpdateInput extends Omit<IToolsConditions_VideoContentSettings, "_id"> {}