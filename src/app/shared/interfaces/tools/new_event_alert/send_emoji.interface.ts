import { ObjectId } from "mongodb";

export interface IToolsNewSupportSendEmojiSettings {
    _id?: ObjectId;
    user_id: ObjectId
    general_settings: {
        active: boolean,
        placemant_position: string,
    }
}

export interface IToolsNewSupportAlertSendEmojiSettingsCreateInput extends Omit<IToolsNewSupportSendEmojiSettings, "_id"> {}
export interface IToolsNewSupportAlertSendEmojiSettingsUpdateInput extends Omit<IToolsNewSupportSendEmojiSettings, "_id" | "user_id"> {}
