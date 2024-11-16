import { IUsedTrialPackage } from '../shared/interfaces/usedTrialPackage.interface';
import { Schema, model } from 'mongoose';

export default model('UsedTrialPackage', new Schema<IUsedTrialPackage>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
        // packageId: { type: Schema.Types.ObjectId, ref: 'Packages', required: true },
    }, {
        timestamps: true,
    }
))
