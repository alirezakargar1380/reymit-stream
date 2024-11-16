import { model, Schema } from 'mongoose'
import { ISubscription } from '../shared/interfaces/subscription.interface';

export default model('Subscriptions', new Schema<ISubscription>(
    {
        userId: { type: Schema.Types.ObjectId, required: true, unique: true },
        endSubscriptionDate: { type: Date, required: true },
        daysOfPackage: { type: Number, required: true }
    },
    {
        timestamps: true,
    }
));