import subscriptionModel from '../../models/subscription.model'
import { ObjectId } from "mongodb";
import moment from "moment"

export const add = async (userId: string, day: number) => {
    const subcription = await subscriptionModel.findOne({
        userId: new ObjectId(userId)
    });
    if (subcription == null) {
        await subscriptionModel.updateOne({ userId: new ObjectId(userId) }, {
            endSubscriptionDate: new Date(moment().add(day, 'days').format()),
            daysOfPackage: day
        }, {
            upsert: true
        })
    } else {
        const end = moment(subcription.endSubscriptionDate)
        const start = moment(new Date())

        if (end.diff(start, "days") <= 0) {
            await subscriptionModel.updateOne(
                { userId: new ObjectId(userId) },
                {
                    endSubscriptionDate: new Date(moment().add(day, 'days').format()),
                    createdAt: new Date(),
                    daysOfPackage: day
                }
            )
        } else {
            await subscriptionModel.updateOne(
                { userId: new ObjectId(userId) },
                {
                    endSubscriptionDate: new Date(moment(subcription.endSubscriptionDate).add(day, 'days').format()),
                    daysOfPackage: subcription.daysOfPackage as number + day
                }
            )
        }

    }
}