import conditionVideoContentSettings_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/conditions.video_content_settings_tool.model"
import {
    IToolsConditions_VideoContentSettings,
    IToolsConditions_VideoContentSettings_CreateInput,
    IToolsConditions_VideoContentSettings_UpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.video_content_settings_tool.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertConditionsVideoContentSettingsRespository {
    constructor(private conditionVideoContentSettingsModel: typeof conditionVideoContentSettings_Schema) {}

    async create(inputs: IToolsConditions_VideoContentSettings_CreateInput): Promise<IToolsConditions_VideoContentSettings> {
        return await this.conditionVideoContentSettingsModel.create(inputs)
    }

    async findByConditionId(condition_id: ObjectId): Promise<IToolsConditions_VideoContentSettings | null> {
        return await this.conditionVideoContentSettingsModel.findOne({
            condition_id: condition_id
        })
    }

    async deleteByConditionId(_id: ObjectId) {
        await this.conditionVideoContentSettingsModel.findOneAndDelete({ condition_id: _id })
    }
    
    async updateByConditionId(condition_id: ObjectId, inputs: IToolsConditions_VideoContentSettings): Promise<IToolsConditions_VideoContentSettings | null> {
        return await this.conditionVideoContentSettingsModel.findOneAndUpdate({
            condition_id: condition_id
        }, inputs)
    }
}
