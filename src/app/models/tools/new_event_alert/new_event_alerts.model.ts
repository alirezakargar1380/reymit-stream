import { model, Schema } from "mongoose"

export default model("tools.new_support_alert", new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true, unique: true },
    key: { type: String, required: true, unique: true }, 
}, {
    timestamps: true,
}))