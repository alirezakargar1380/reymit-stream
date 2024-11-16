import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose'
import {EUserActivites_Sections, IUserActivites} from '../shared/interfaces/user_activites.interface';

export default model('user_activities.logs', new Schema<IUserActivites>({
        user_id: { type: ObjectId, required: true },
        section: { type: String, required: true, enum: EUserActivites_Sections },
        before_data: { type: String, required: false },
        after_data: { type: String, required: false },
        data: { type: String, required: false },
    }, {
        timestamps: true,
    })
);
