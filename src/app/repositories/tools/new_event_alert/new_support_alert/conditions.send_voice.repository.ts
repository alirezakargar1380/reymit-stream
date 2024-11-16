import conditionSendVoice_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/conditions.send_voice.model"
import {
    IToolsConditions_SendVoiceSettings,
    IToolsConditions_SendVoiceSettings_CreateInput,
    IToolsConditions_SendVoiceSettings_UpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.send_voice.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertConditionsSendVoiceModel {
    constructor(private conditionSendVoiceModel: typeof conditionSendVoice_Schema) {}

    async create(inputs: IToolsConditions_SendVoiceSettings_CreateInput): Promise<IToolsConditions_SendVoiceSettings> {
        return await this.conditionSendVoiceModel.create(inputs)
    }

    async findByConditionId(condition_id: ObjectId): Promise<IToolsConditions_SendVoiceSettings | null> {
        return await this.conditionSendVoiceModel.findOne({
            condition_id: condition_id
        })
    }

    async deleteByConditionId(_id: ObjectId) {
        await this.conditionSendVoiceModel.findOneAndDelete({ condition_id: _id })
    }
    
    async updateByConditionId(condition_id: ObjectId, inputs: IToolsConditions_SendVoiceSettings_UpdateInput): Promise<IToolsConditions_SendVoiceSettings | null> {
        return await this.conditionSendVoiceModel.findOneAndUpdate({
            condition_id: condition_id
        }, inputs)
    }
}
