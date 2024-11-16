import { ObjectId } from "mongodb";

interface IMP3Content {
    file_selection_method: string,
    link_or_name_of_file?: string,
    sound_volume?: number,
}

interface ITiming {
    alert_show_time: number,
    alert_delay_time: number,
    show_delay_sponser_details: number,
}

export interface IToolsNewSupportAlertGeneralSettings {
    _id?: ObjectId;
    user_id: ObjectId,
    new_donate_alert_sound: IMP3Content,
    timing: ITiming,
    sponser_descreption: {
        show_sponser_description: boolean,
    },
    video_content: {
        limit_the_height_and_width_of_video_content: boolean,
    }
}

export interface IToolsNewSupportAlertGeneralSettingsCreateInput extends Omit<IToolsNewSupportAlertGeneralSettings, "_id"> {}
export interface IToolsNewSupportAlertGeneralSettingsUpdateInput extends Omit<IToolsNewSupportAlertGeneralSettings, "_id"> {}
