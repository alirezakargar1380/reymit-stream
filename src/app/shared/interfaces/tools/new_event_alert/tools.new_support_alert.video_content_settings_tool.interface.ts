import {ObjectId} from "mongodb"
import {
    IContent,
    IContentWithPlacemant
} from "./tools.new_support_alert.files.interface"

export interface IToolsNewSupportAlertVideoContentSettingsTool {
    _id?: ObjectId;
    user_id: ObjectId,
    background_content_sponsor_profile: IContent,
    content_below_sponsor_profile: IContent,
    other_location_for_placemant_of_content: {
        top_content_sponsor_profile: IContent,
        right_content_sponsor_profile: IContent,
        left_content_sponsor_profile: IContent,
        bottom_content_sponsor_profile: IContent,
    }
}

export interface IToolsNewSupportAlertVideoContentSettingsToolCreateInput extends Omit<IToolsNewSupportAlertVideoContentSettingsTool, "_id"> {}
export interface IToolsNewSupportAlertVideoContentSettingsToolUpdateInput extends Omit<IToolsNewSupportAlertVideoContentSettingsTool, "_id"> {}