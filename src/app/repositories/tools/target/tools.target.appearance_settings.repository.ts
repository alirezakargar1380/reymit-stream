import toolsTargetAppearanceSettingsSchema from './../../../models/tools/target/tools.target.appearance_settings.model';
import {
    tools_targart_appearanceSettings,
    IToolsTargetAppearanceSettingsCreateInput,
    IToolsTargetAppearanceSettingsUpdateInput
} from "./../../../shared/interfaces/tools/target/tools.target.appearance_settings.interface"
import {ObjectId} from "mongodb"

export class ToolsTargetAppearanceSettings {
    constructor(private toolsTargetAppearanceSettingsModel: typeof toolsTargetAppearanceSettingsSchema) {}

    async create(inputs: IToolsTargetAppearanceSettingsCreateInput): Promise<tools_targart_appearanceSettings | null> {
        return await this.toolsTargetAppearanceSettingsModel.create(inputs);
    }

    async findByUserId(user_id: ObjectId): Promise<tools_targart_appearanceSettings | null> {
        return await this.toolsTargetAppearanceSettingsModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, targetAppearanceSettings: IToolsTargetAppearanceSettingsUpdateInput): Promise<tools_targart_appearanceSettings | null> {
        return await this.toolsTargetAppearanceSettingsModel.findOneAndUpdate({
            user_id: user_id
        }, { $set: { ...targetAppearanceSettings } })
    }

}