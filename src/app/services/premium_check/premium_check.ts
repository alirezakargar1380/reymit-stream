import {IUser} from "../../shared/interfaces/user.interface";
import subscriptionModel from '../../models/subscription.model'
import {ObjectId} from "mongodb";
import Exception from "../../utils/error.utility";

export const check = async (userId: string): Promise<void> => {
    const subscription = await subscriptionModel.findOne({ userId: new ObjectId(userId) })
    if (!subscription) throw Exception.setError("subscription was not found", true)
    const result: boolean =  subscription!.endSubscriptionDate > new Date
    if (!result) throw Exception.setError("subscription of this user was end", true)
};