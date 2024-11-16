import { IGatewayAppearanceSettings } from '../../shared/interfaces/gateway/GatewayAppearanceSettings.interface';
import appearanceSettingsSchema from "../../models/gateway_appearance_settings.model";
import { ObjectId } from "mongodb";


export class AppearanceSettingsRepository {
    constructor(private appearanceSettingsModel: typeof appearanceSettingsSchema) { }

    async findByUserId(userId: string): Promise<IGatewayAppearanceSettings | null> {
        return (await this.appearanceSettingsModel.findOne({ user_id: new ObjectId(userId) }))
    }
}