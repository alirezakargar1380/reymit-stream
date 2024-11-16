import { ObjectId } from 'mongodb';
import { IUser } from './user.interface';

export interface IEmailVerifyRequest {
    _id: ObjectId
    code: string
    email: string
    user_id: ObjectId | IUser
}