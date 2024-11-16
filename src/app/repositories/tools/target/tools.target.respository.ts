import toolsTargetSchema from "./../../../models/tools/target/tools.target"
import {IToolsTarget, IToolsTargetCreateInput, IToolsTargetUpdateInput} from "./../../../shared/interfaces/tools/target/tools.target.interface"
import {ObjectId} from "mongodb"

export class ToolsTarget {
    constructor(private toolsTargetModel: typeof toolsTargetSchema) {}

    async create(inputs: IToolsTargetCreateInput): Promise<IToolsTarget | null> {
        return await this.toolsTargetModel.create(inputs)
    }

    async findByUserId(user_id: ObjectId): Promise<IToolsTarget | null> {
        return await this.toolsTargetModel.findOne({
            user_id: user_id
        })
    }

    async updateByUserId(user_id: ObjectId, inputs: IToolsTargetUpdateInput): Promise<IToolsTarget | null> {
        return await this.toolsTargetModel.findOneAndUpdate({
            user_id: user_id
        }, { $set: { ...inputs } })
    }
}