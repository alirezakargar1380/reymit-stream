import { ObjectId } from 'mongodb';
import { IUser } from '../user.interface';
export interface IChangedGatewayAddress {
    _id: ObjectId
    user: ObjectId | IUser
    befor: string
    after: string
    createdAt: Date
    updatedAt: Date
}