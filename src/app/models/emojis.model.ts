import mongoose, {Schema} from "mongoose"
import { IEmoji } from '../shared/interfaces/emojis/emojis.interface'

export default mongoose.model('Emojis', new Schema<IEmoji>({
    user: { type: mongoose.Types.ObjectId, required: true },
    title: { type: String, required: true },
    emoji: { type: String, required: true },
    price: { type: Number, required: true },
    animationStyle: { type: String, required: true },
    animationSpeed: { type: String, required: true },
    animationCount: { type: String, required: true },
}, {
    timestamps: true
}));

/*
    TODO:
      - add enum
*/
