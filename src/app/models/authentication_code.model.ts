import { IAuthenticationCode } from '../shared/interfaces/authentication-code.interface';
import { model, Schema } from "mongoose"

const authentication_code_schema = new Schema<IAuthenticationCode>({
    email: {
        type: String,
    },
    code: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
})

export default model('authentication_code', authentication_code_schema);