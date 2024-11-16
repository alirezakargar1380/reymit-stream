// interfaces
import {IToolsConditions_GeneralSettings_CreateInput, IToolsConditions_GeneralSettings} from "./conditions.general_settings.interface"
import {IToolsConditions_AppearanceSettings_CreateInput, IToolsConditions_AppearanceSettings} from "./conditions.appearance_settings.interface"
import {IToolsConditions_SendEmoji_CreateInput, IToolsConditions_SendEmoji} from "./conditions.send_emoji.interface"
import {IToolsConditions_SendVoiceSettings_CreateInput, IToolsConditions_SendVoiceSettings} from "./conditions.send_voice.interface"
import {IToolsConditions_VideoContentSettings_CreateInput, IToolsConditions_VideoContentSettings} from "./conditions.video_content_settings_tool.interface"

import { ObjectId } from "mongodb";

export interface IToolsNewDonationConditions {
    _id: ObjectId;
    user_id: ObjectId
    type_of_conditions: String
    amount: Number
}

export interface IToolsNewDonationConditionsCreateInput extends Omit<IToolsNewDonationConditions, "_id"> {}
export interface IToolsNewDonationConditionsFindInput extends Partial<IToolsNewDonationConditions> {}
export interface IToolsNewDonationConditionsUpdateInput extends Omit<IToolsNewDonationConditions, "_id"> {}
export interface IToolsNewDonationConditionsCreated extends IToolsNewDonationConditions {
    _id: ObjectId,
    general_settings: IToolsConditions_GeneralSettings_CreateInput,
    appearance_settings: IToolsConditions_AppearanceSettings_CreateInput,
    send_emoji: IToolsConditions_SendEmoji_CreateInput,
    send_voice: IToolsConditions_SendVoiceSettings_CreateInput,
    video_content_settings_tool: IToolsConditions_VideoContentSettings_CreateInput
}
export interface IToolsNewDonationConditionsUpdated extends IToolsNewDonationConditions {
    _id: ObjectId,
    general_settings?: IToolsConditions_GeneralSettings,
    appearance_settings?: IToolsConditions_AppearanceSettings,
    send_emoji?: IToolsConditions_SendEmoji,
    send_voice?: IToolsConditions_SendVoiceSettings,
    video_content_settings_tool?: IToolsConditions_VideoContentSettings
}
export interface IAllToolsNewDonationConditions extends IToolsNewDonationConditions {
    general_settings: Partial<IToolsConditions_GeneralSettings_CreateInput>[],
    appearance_settings: Partial<IToolsConditions_AppearanceSettings_CreateInput>[],
    send_emoji: Partial<IToolsConditions_SendEmoji_CreateInput>[],
    send_voice: Partial<IToolsConditions_SendVoiceSettings_CreateInput>[],
    video_content_settings_tool: Partial<IToolsConditions_VideoContentSettings_CreateInput>[]
}
