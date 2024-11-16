import generalSettings_Schema from "../../../models/tools/new_event_alert/new_support_alert/new_support_alert.general_settings.model"
import {
    IToolsNewSupportAlertGeneralSettings,
    IToolsNewSupportAlertGeneralSettingsCreateInput,
    IToolsNewSupportAlertGeneralSettingsUpdateInput,
} from "../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.general_settings"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlert_general_settings_content_settings {
    constructor(private generalSettingsModel: typeof generalSettings_Schema) {}

    async create(inputs: IToolsNewSupportAlertGeneralSettingsCreateInput): Promise<IToolsNewSupportAlertGeneralSettings> {
        return await this.generalSettingsModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewSupportAlertGeneralSettings | null> {
        return await this.generalSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewSupportAlertGeneralSettingsUpdateInput): Promise<IToolsNewSupportAlertGeneralSettings | null> {
        return await this.generalSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, inputs)
    }
}
