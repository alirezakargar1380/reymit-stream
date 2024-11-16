import {ObjectId} from "mongodb";

export interface IUser {
    _id: ObjectId
    email: string;
    name: string;
    username: string;
    password: string;
    phoneNumber: string;
    displayName: string;
    gatewayAddress: string;
    isGatewayActive: boolean;
    avatar: string;
    has_accepted_terms: boolean;
    active: boolean;
    email_verification: boolean;
    phoneNumber_verification: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export interface IUserDocument extends IUser, Document { }
export interface IUserCreateInput extends Omit<IUser, '_id' | 'createdAt' | 'updatedAt'> { }
export interface IUserUpdateInput extends Partial<IUserCreateInput>{}
export interface IUserFindGatewayInput {
    gatewayAddress: string
    isGatewayActive: boolean
}
export interface IUserSelector {
    _id?: boolean;
    email?: boolean;
    name?: boolean;
    username?: boolean;
    password?: boolean;
    phoneNumber?: boolean;
}