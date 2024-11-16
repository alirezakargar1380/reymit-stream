import toolsTargetMainSettingsSchema from "./../../../models/tools/target/tools.target.main_settings.model"
import {
    IToolsTargetMainSettingsCreateInput,
    tools_target_mainSettings,
    IToolsTargetMainSettingsUpdateInput
} from "./../../../shared/interfaces/tools/target/tools.target.main_settings.interface"
import {ObjectId} from "mongodb"

export class ToolsTargetMainSettings {
    constructor(private toolsTargetMainSettingsModel: typeof toolsTargetMainSettingsSchema) {}

    async create(inputs: IToolsTargetMainSettingsCreateInput): Promise<tools_target_mainSettings> {
        return await this.toolsTargetMainSettingsModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<tools_target_mainSettings | null> {
        return await this.toolsTargetMainSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, targetMainSettings: IToolsTargetMainSettingsUpdateInput): Promise<tools_target_mainSettings | null> {
        return await this.toolsTargetMainSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, { $set: { ...targetMainSettings } })
    }
}