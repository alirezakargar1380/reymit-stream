import mongoose, {Schema} from "mongoose"
import { Idonates } from '../shared/interfaces/donates/donates.interface'

/*
    TODO:
      - create index
      - check for needed fields
      - add enum 
*/


export default mongoose.model('Donates', new Schema<Idonates>({
    userId: { type: mongoose.Types.ObjectId, required: true },
    amount_irr: { type: Number, required: true },
    displayName: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    phoneNumber: { type: String, required: false, default: '' },
    description: { type: String, required: false, default: '' },
    publishName: { type: Boolean, required: false, default: true },
    publishDesc: { type: Boolean, required: false, default: true },
    publishNameInDonatorList: { type: Boolean, required: false, default: true },
    verified: { type: Boolean, default: false },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['zarinpal', 'idpay', 'pardakhtpay', 'payping']
    },
    transid: { type: String },
    token: { type: String, required: true },
    has_accepted_terms: { type: Boolean, required: true },
}, {
    timestamps: true
}));