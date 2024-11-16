import ToolsNewEventAlertVideoContent_settings_content_settings_Schema from "./../../../models/tools/new_event_alert/new_support_alert/new_support_alert.video_content_settings_tool.model"
import {
    IToolsNewSupportAlertVideoContentSettingsToolCreateInput,
    IToolsNewSupportAlertVideoContentSettingsTool,
    IToolsNewSupportAlertVideoContentSettingsToolUpdateInput
} from "./../../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertVideoContent_settings_content_settings {
    constructor(private toolsNewEventAlertVideoContent_settings_content_settingsModel: typeof ToolsNewEventAlertVideoContent_settings_content_settings_Schema) {}

    async create(toolsNewEventAlertVideoContent_settings_content_settings: IToolsNewSupportAlertVideoContentSettingsToolCreateInput): Promise<IToolsNewSupportAlertVideoContentSettingsTool> {
        return await this.toolsNewEventAlertVideoContent_settings_content_settingsModel.create(toolsNewEventAlertVideoContent_settings_content_settings)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewSupportAlertVideoContentSettingsTool | null> {
        return await this.toolsNewEventAlertVideoContent_settings_content_settingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewSupportAlertVideoContentSettingsToolUpdateInput): Promise<IToolsNewSupportAlertVideoContentSettingsTool | null> {
        return await this.toolsNewEventAlertVideoContent_settings_content_settingsModel.findOneAndUpdate({
            user_id: user_id
        }, inputs)
    }
}
