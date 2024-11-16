import { IBuyPackageRequest } from '../shared/interfaces/package.interface';
import { Schema, model } from 'mongoose';
import { gateway_constants } from '../shared/constants/gateway/gateway.constants';

export default model('BuyPackageRequest', new Schema<IBuyPackageRequest>({
        token: { type: String, required: true },
        iri_price: { type: Number, required: true },
        gateway: { type: String, required: true, enum: gateway_constants },
        package: { type: Schema.Types.ObjectId, ref: 'Packages', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        verified: { type: Boolean, default: false },
        description: { type: String },
        tracking_code: { type: Number, required: true },
        transid: { type: Number, required: false },
    }, {
        timestamps: true,
    })
);