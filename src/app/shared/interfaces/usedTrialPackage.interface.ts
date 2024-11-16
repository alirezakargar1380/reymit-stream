import { ObjectId } from 'mongodb';
import { IUser } from './user.interface';
import { IPackage } from './package.interface';

export interface IUsedTrialPackage {
    _id: ObjectId
    userId: ObjectId
    // packageId: ObjectId
    createdAt: Date;
    updatedAt: Date;
}

export interface IUsedTrialPackageCreateInput extends Omit<IUsedTrialPackage, '_id' | 'createdAt' | 'updatedAt'> { }