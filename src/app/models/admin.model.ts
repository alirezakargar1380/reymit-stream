import mongoose, { Schema } from 'mongoose'
import { IUser } from '../shared/interfaces/user.interface';

const adminSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{timestamps: true})

export default mongoose.model('Admins', adminSchema);