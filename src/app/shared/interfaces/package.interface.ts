import { ObjectId } from 'mongodb';
import { IUser } from './user.interface';
import { gateway_constants } from '../constants/gateway/gateway.constants';

export interface IPackage {
    _id: ObjectId
    title: string;
    image: string;
    day: number;
    iri_price: number;
    offered?: boolean;
    is_trial?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBuyPackageRequest {
    _id: ObjectId
    token: string;
    iri_price: number;
    description: String | null;
    gateway: gateway_constants;
    package: ObjectId | IPackage;
    user: ObjectId | IUser;
    verified: boolean;
    transid: number;
    tracking_code: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICodePackage {
    _id: ObjectId;
    code: string;
    day: number;
    expire_day: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBuyPackageRequestCreateInput extends Omit<IBuyPackageRequest, '_id' | 'transid' | 'createdAt' | 'updatedAt'> { }