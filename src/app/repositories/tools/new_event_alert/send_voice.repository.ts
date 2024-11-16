import sendVoiceSettings_Schema from "../../../models/tools/new_event_alert/new_support_alert/new_support_alert.send_voice.model"
import {
    IToolsNewSupportAlertSendVoiceSettingsCreateInput,
    IToolsNewSupportAlertSendVoiceSettingsUpdateInput,
    IToolsNewSupportSendVoiceSettings
} from "../../../shared/interfaces/tools/new_event_alert/send_voice.inteface"

import { ObjectId } from "mongodb"

export class ToolsNewEventAlert_sendVoice_settings {
    constructor(private sendVoiceSettingsModel: typeof sendVoiceSettings_Schema) { }

    async create(inputs: IToolsNewSupportAlertSendVoiceSettingsCreateInput): Promise<IToolsNewSupportSendVoiceSettings> {
        return await this.sendVoiceSettingsModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewSupportSendVoiceSettings | null> {
        return await this.sendVoiceSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewSupportAlertSendVoiceSettingsUpdateInput): Promise<IToolsNewSupportSendVoiceSettings | null> {
        return await this.sendVoiceSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, inputs)
    }
}
