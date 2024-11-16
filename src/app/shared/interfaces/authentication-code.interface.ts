import { ObjectId } from "mongoose";

export interface IAuthenticationCode {
    _id: ObjectId;
    email: string;
    code: number;
    createdAt: Date;
    updatedAt: Date;
}