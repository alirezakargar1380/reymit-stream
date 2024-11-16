import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose'
import {
    EUserUploaderActivitesSectionsTypes,
    IUserUploaderActivites,
} from './../shared/interfaces/user_uploader_activites.iterface';

export default model('user_uploader_activites.logs', new Schema<IUserUploaderActivites>({
        user_id: { type: ObjectId, required: true },
        key: { type: String, required: false },
        type: { type: String, required: false, enum: EUserUploaderActivitesSectionsTypes }
    }, {
        timestamps: true,
    })
);