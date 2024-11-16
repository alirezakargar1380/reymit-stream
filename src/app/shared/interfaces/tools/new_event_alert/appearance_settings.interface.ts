import { ObjectId } from "mongodb";

export interface IToolsNewSupportAlertAppearanceSettings {
    _id?: ObjectId;
    user_id: ObjectId,
    appearance_profile_of_the_sponsor_profile_box: {
        vertical_position_of_the_sponsor_profile_box: string,
        horizonal_position_of_the_sponsor_profile_box: string,
        padding_top: number,
        padding_right: number,
        padding_bottom: number,
        padding_left: number,
    }
}

export interface IToolsNewSupportAlertAppearanceSettingsCreateInput extends Omit<IToolsNewSupportAlertAppearanceSettings, "_id"> {}
export interface IToolsNewSupportAlertAppearanceSettingsUpdateInput extends Omit<IToolsNewSupportAlertAppearanceSettings, "_id"> {}
