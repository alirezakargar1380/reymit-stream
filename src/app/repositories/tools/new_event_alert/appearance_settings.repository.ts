import appearanceSettings_Schema from "../../../models/tools/new_event_alert/new_support_alert/new_support_alert.appearance_settings.model"
import {
    IToolsNewSupportAlertAppearanceSettings,
    IToolsNewSupportAlertAppearanceSettingsCreateInput,
    IToolsNewSupportAlertAppearanceSettingsUpdateInput
} from "../../../shared/interfaces/tools/new_event_alert/appearance_settings.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlert_appearance_settings_content_settings {
    constructor(private appearanceSettingsModel: typeof appearanceSettings_Schema) {}

    async create(inputs: IToolsNewSupportAlertAppearanceSettingsCreateInput): Promise<IToolsNewSupportAlertAppearanceSettings> {
        return await this.appearanceSettingsModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewSupportAlertAppearanceSettings | null> {
        return await this.appearanceSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewSupportAlertAppearanceSettingsUpdateInput): Promise<IToolsNewSupportAlertAppearanceSettings | null> {
        return await this.appearanceSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, inputs)
    }
}
