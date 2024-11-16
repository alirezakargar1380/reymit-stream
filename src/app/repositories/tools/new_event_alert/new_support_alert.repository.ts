import toolsNewEventAlertSchema from "./../../../models/tools/new_event_alert/new_event_alerts.model"
import {IToolsNewEventAlert, IToolsNewEventAlertCreateInput, IToolsNewEventAlertUpdateInput} from "./../../../shared/interfaces/tools/new_event_alert/new_event_alerts.interface"
import {ObjectId} from "mongodb"

export class ToolsNewEventAlertRepository {
    constructor(private toolsNewEventAlertModel: typeof toolsNewEventAlertSchema) {}

    async create(inputs: IToolsNewEventAlertCreateInput): Promise<IToolsNewEventAlert | null> {
        return await this.toolsNewEventAlertModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsNewEventAlert | null> {
        return await this.toolsNewEventAlertModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsNewEventAlertUpdateInput): Promise<IToolsNewEventAlert | null> {
        return await this.toolsNewEventAlertModel.findOneAndUpdate({
            user_id: user_id
        }, { $set: { ...inputs } })
    }
}