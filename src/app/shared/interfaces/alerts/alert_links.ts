import { ObjectId } from "mongodb";

export interface IAlertKeyInput {
    user_id: ObjectId
    section: string
}