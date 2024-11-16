import conditionGeneralSettings_Schema from "../../../../models/tools/new_event_alert/new_support_alert/conditions/conditions.general_settings.model"
import {
    IToolsConditions_GeneralSettings,
    IToolsConditions_GeneralSettings_CreateInput,
    IToolsConditions_GeneralSettings_UpdateInput
} from "../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.general_settings.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertConditionsGeneralSettings {
    constructor(private conditionGeneralSettingsModel: typeof conditionGeneralSettings_Schema) {}

    async create(inputs: IToolsConditions_GeneralSettings_CreateInput): Promise<IToolsConditions_GeneralSettings> {
        return await this.conditionGeneralSettingsModel.create(inputs)
    }

    async findByConditionId(condition_id: ObjectId): Promise<IToolsConditions_GeneralSettings | null> {
        return await this.conditionGeneralSettingsModel.findOne({
            condition_id: condition_id
        })
    }

    async deleteByConditionId(_id: ObjectId) {
        await this.conditionGeneralSettingsModel.findOneAndDelete({ condition_id: _id })
    }
    
    async updateByConditionId(condition_id: ObjectId, inputs: IToolsConditions_GeneralSettings_UpdateInput): Promise<IToolsConditions_GeneralSettings | null> {
        return await this.conditionGeneralSettingsModel.findOneAndUpdate({
            condition_id: condition_id
        }, inputs)
    }
}