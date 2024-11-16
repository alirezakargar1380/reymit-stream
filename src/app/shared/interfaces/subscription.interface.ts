import { ObjectId } from "mongodb";

export interface ISubscription {
    _id: string,
    userId: ObjectId,
    endSubscriptionDate: Date,
    daysOfPackage: Number,
    createdAt: Date,
    updatedAt: Date,
}