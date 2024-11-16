import { ObjectId } from "mongodb"

export interface IToolsConditions_SendVoiceSettings {
    _id?: ObjectId
    condition_id: ObjectId
    general_settings: {
        change_status_of_this_section_for_this_condition: String
        alert_delay_time: Number
        volume: Number
    }
}

export interface IToolsConditions_SendVoiceSettings_CreateInput extends Omit<IToolsConditions_SendVoiceSettings, "_id"> {}
export interface IToolsConditions_SendVoiceSettings_UpdateInput extends Omit<IToolsConditions_SendVoiceSettings, "_id"> {}