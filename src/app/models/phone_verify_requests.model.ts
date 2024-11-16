import { IPhoneVerifyRequest } from '../shared/interfaces/PhoneVerifyRequest.interface';
// @ts-ignore
import { Schema, model } from 'mongoose';


const PhoneVerifyRequestSchema = new Schema<IPhoneVerifyRequest>({
    code: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
}, {
    timestamps: true,
})


export default model('PhoneVerifyRequest', PhoneVerifyRequestSchema);