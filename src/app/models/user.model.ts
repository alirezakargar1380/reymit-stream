import { model, Schema } from 'mongoose'
import { IUser } from '../shared/interfaces/user.interface';

export default model('Users', new Schema<IUser>({
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phoneNumber: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
        gatewayAddress: { type: String, default: '', unique: true },
        isGatewayActive: { type: Boolean, default: false },
        avatar: { type: String, required: false, default: '' },
        has_accepted_terms: { type: Boolean, required: true, default: false },
        active: {
            type: Boolean,
            required: true,
            default: false
        },
        email_verification: {
            type: Boolean,
            required: true,
            default: false
        },
        phoneNumber_verification: {
            type: Boolean,
            required: true,
            default: false
        },
    }, {
        timestamps: true,
    })
);
