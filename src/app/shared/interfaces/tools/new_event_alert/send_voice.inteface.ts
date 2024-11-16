import { ObjectId } from "mongodb";

export interface IToolsNewSupportSendVoiceSettings {
    _id?: ObjectId;
    user_id: ObjectId,
    voice_recording_settings: {
        active: boolean,
        max_voice_length?: number,
        min_voice_length?: number,
        volume?: number,
        start_play_delay?: number,
    }
}

export interface IToolsNewSupportAlertSendVoiceSettingsCreateInput extends Omit<IToolsNewSupportSendVoiceSettings, "_id"> {}
export interface IToolsNewSupportAlertSendVoiceSettingsUpdateInput extends Omit<IToolsNewSupportSendVoiceSettings, "_id" | "user_id"> {}
