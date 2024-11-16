import mongoose, {
    Schema
} from "mongoose"

const forget_password_tokens_Schema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
}, {
    timestamps: true,
})

export default mongoose.model('forget_password_tokens', forget_password_tokens_Schema);