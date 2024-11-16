import { ObjectId } from "mongoose";
import { IUser } from './user.interface';

export interface IPhoneVerifyRequest {
    _id: ObjectId
    code: string;
    phoneNumber: string;
    user: ObjectId | IUser
    createdAt: Date;
    updatedAt: Date;
}