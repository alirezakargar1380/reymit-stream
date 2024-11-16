import { Schema, model } from 'mongoose'
import { ICodePackage } from "../shared/interfaces/package.interface";

export default model('CodePackage', new Schema<ICodePackage>({
    code: { type: String, required: true, unique: true },
    day: { type: Number, required: true },
    expire_day: { type: Number, required: true },
}, {
    timestamps: true,
}));