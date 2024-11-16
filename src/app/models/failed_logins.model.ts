import mongoose, {
    Schema
} from "mongoose"

const Failed_Logins_Schema = new Schema({
    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

export default mongoose.model('Failed_logins', Failed_Logins_Schema);