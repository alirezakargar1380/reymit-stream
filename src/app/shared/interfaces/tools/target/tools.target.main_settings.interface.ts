import {ObjectId} from "mongodb"

export interface tools_target_mainSettings {
    _id?: ObjectId
    user_id: ObjectId
    active: boolean,
    show_target: boolean,
    target_title: string,
    target_amount: number,
    amount_until_now: number,
    created_at?: Date
    updated_at?: Date
}

export interface IToolsTargetMainSettingsCreateInput extends Omit<tools_target_mainSettings, "_id"> {}
export interface IToolsTargetMainSettingsUpdateInput extends Partial<tools_target_mainSettings> {}
export interface IToolsTargetMainSettingsDefaultInput extends Omit<tools_target_mainSettings, "_id" | "user_id" | "target_active_time"> {}