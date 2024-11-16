import conditionSendEmoji_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/conditions.send_emoji.model"
import {
    IToolsConditions_SendEmoji,
    IToolsConditions_SendEmoji_CreateInput,
    IToolsConditions_SendEmoji_UpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.send_emoji.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertConditionsSendEmojiModel {
    constructor(private conditionSendEmojiModel: typeof conditionSendEmoji_Schema) {}

    async create(inputs: IToolsConditions_SendEmoji_CreateInput): Promise<IToolsConditions_SendEmoji> {
        return await this.conditionSendEmojiModel.create(inputs)
    }

    async findByConditionId(condition_id: ObjectId): Promise<IToolsConditions_SendEmoji | null> {
        return await this.conditionSendEmojiModel.findOne({
            condition_id: condition_id
        })
    }

    async deleteByConditionId(_id: ObjectId) {
        await this.conditionSendEmojiModel.findOneAndDelete({ condition_id: _id })
    }
    
    async updateByConditionId(condition_id: ObjectId, inputs: IToolsConditions_SendEmoji_UpdateInput): Promise<IToolsConditions_SendEmoji | null> {
        return await this.conditionSendEmojiModel.findOneAndUpdate({
            condition_id: condition_id
        }, inputs)
    }
}
