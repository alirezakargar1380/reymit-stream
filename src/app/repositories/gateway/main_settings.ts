import { IGatewayMainSettings } from '../../shared/interfaces/gateway/gateway-main-settings.interface';
import mainSettingsSchema from "../../models/gateway_main_settings.model";
import { ObjectId } from "mongodb";


export class MainSettingsRepository {
    constructor(private mainSettingsModel: typeof mainSettingsSchema) { }

    async findByUserId(userId: string): Promise<IGatewayMainSettings | null> {
        return (await this.mainSettingsModel.findOne({ user_id: new ObjectId(userId) }))
    }
}