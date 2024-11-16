import { IPackage } from '../shared/interfaces/package.interface';
import { Schema, model } from 'mongoose';

export default model('Packages', new Schema<IPackage>(
    {
        title: { type: String, required: true },
        image: { type: String, required: false },
        day: { type: Number, required: true },
        iri_price: { type: Number, required: true },
        offered: { type: Boolean, default: false },
        is_trial: { type: Boolean, default: false },
    }, {
        timestamps: true,
    })
);