import { Schema, model } from 'mongoose'

const EmailVerifyRequestSchema = new Schema({
    code: { type: String, required: true },
    email: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
}, {
    timestamps: true,
})


export default model('EmailVerifyRequest', EmailVerifyRequestSchema);