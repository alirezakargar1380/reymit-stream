import mongoose, { Schema } from 'mongoose'
import { ILanding } from '../shared/interfaces/landings/landings.interface';

const LandingSchema = new Schema<ILanding>({
    key: { type: String },
    title: { type: String },
    subtitle: { type: String },
    text: { type: String },
    category: { type: String, required: true, unique: true },
    link: { type: String },
    image: { type: String },
})

export default mongoose.model('Landings', LandingSchema);