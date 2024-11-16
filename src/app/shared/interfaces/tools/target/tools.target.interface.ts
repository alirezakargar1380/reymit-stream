import {ObjectId} from "mongodb"

export interface IToolsTarget {
    _id?: ObjectId
    user_id: ObjectId
    key: string
}

export interface IToolsTargetCreateInput extends Omit<IToolsTarget, '_id'> {}
export interface IToolsTargetUpdateInput extends Omit<IToolsTarget, '_id' | 'user_id'> {}