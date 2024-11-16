import {ObjectId} from "mongodb"

export interface IToolsNewEventAlert {
    _id?: ObjectId
    user_id: ObjectId
    key: string
}

export interface IToolsNewEventAlertCreateInput extends Omit<IToolsNewEventAlert, '_id'> {}
export interface IToolsNewEventAlertUpdateInput extends Omit<IToolsNewEventAlert, '_id' | 'user_id'> {}