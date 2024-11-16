import { ObjectId } from "mongodb"

export interface IToolsConditions_SendEmoji {
    _id?: ObjectId
    condition_id: ObjectId
    general_settings: {
        change_status_of_this_section_for_this_condition: String
        placemant_position: String
    }
}

export interface IToolsConditions_SendEmoji_CreateInput extends Omit<IToolsConditions_SendEmoji, "_id"> {}
export interface IToolsConditions_SendEmoji_UpdateInput extends Omit<IToolsConditions_SendEmoji, "_id"> {}