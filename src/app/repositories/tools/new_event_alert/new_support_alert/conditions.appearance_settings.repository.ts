import conditionAppearanceSettings_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/conditions.appearance_settings.model"
import {
    IToolsConditions_AppearanceSettings,
    IToolsConditions_AppearanceSettings_CreateInput,
    IToolsConditions_AppearanceSettings_UpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.appearance_settings.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertConditionsAppearanceSettings {
    constructor(private conditionAppearanceSettingsModel: typeof conditionAppearanceSettings_Schema) {}

    async create(inputs: IToolsConditions_AppearanceSettings_CreateInput): Promise<IToolsConditions_AppearanceSettings> {
        return await this.conditionAppearanceSettingsModel.create(inputs)
    }

    async findByConditionId(condition_id: ObjectId): Promise<IToolsConditions_AppearanceSettings | null> {
        return await this.conditionAppearanceSettingsModel.findOne({
            condition_id: condition_id
        })
    }

    async deleteByConditionId(_id: ObjectId) {
        await this.conditionAppearanceSettingsModel.findOneAndDelete({ condition_id: _id })
    }
    
    async updateByConditionId(condition_id: ObjectId, inputs: IToolsConditions_AppearanceSettings): Promise<IToolsConditions_AppearanceSettings | null> {
        return await this.conditionAppearanceSettingsModel.findOneAndUpdate({
            condition_id: condition_id
        }, inputs)
    }
}