import sendEmojiSettings_Schema from "../../../models/tools/new_event_alert/new_support_alert/new_support_alert.send_emoji.model"
import {
    IToolsNewSupportAlertSendEmojiSettingsCreateInput,
    IToolsNewSupportAlertSendEmojiSettingsUpdateInput,
    IToolsNewSupportSendEmojiSettings
} from "../../../shared/interfaces/tools/new_event_alert/send_emoji.interface"

import { ObjectId } from "mongodb"

export class ToolsNewEventAlert_sendEmoji_settings {
    constructor(private sendEmojiSettingsModel: typeof sendEmojiSettings_Schema) { }

    async create(inputs: IToolsNewSupportAlertSendEmojiSettingsCreateInput): Promise<IToolsNewSupportSendEmojiSettings> {
        return await this.sendEmojiSettingsModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewSupportSendEmojiSettings | null> {
        return await this.sendEmojiSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewSupportAlertSendEmojiSettingsUpdateInput): Promise<IToolsNewSupportSendEmojiSettings | null> {
        return await this.sendEmojiSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, inputs)
    }
}
