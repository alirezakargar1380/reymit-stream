import mongoose, {
    Schema
} from "mongoose"
import { IGatewayMainSettings } from "../shared/interfaces/gateway/gateway-main-settings.interface";

const MainGatewaySettings = new Schema<IGatewayMainSettings>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    minimum_amount_of_support: {
        type: Number,
        required: false,
        default: 0
    },
    maximux_amount_of_support: { type: Number, required: false, default: 50000 },
    filter_amount_of_support: {
        type: Boolean, required: false, default: false
    },
    currency_support: { type: Boolean, required: false, default: false },
    deposit_support_to_id: { type: String, required: false, default: 'self', enum: ['self', 'charity'] },
    
    // this amount number should be in rage of minimum_amount_of_support and maximux_amount_of_support
    maximum_amount_of_payment_to_confirm_the_phone_number: {
        type: Number
    },
    need_confirm_the_phone_number_before_payment: {
        type: Boolean,
        required: false,
        default: false
    },
    gateway_logo: {
        type: String,
        required: false,
        default: ''
    },
    gateways: {
        zarinpal: {
            code: { type: String, required: false, default: '' },
            is_default: { type: Boolean, required: false, default: false },
        },
        idpay: {
            code: { type: String, required: false, default: '' },
            is_default: { type: Boolean, required: false, default: false },
        },
        pardakhtpay: {
            code: { type: String, required: false, default: '' },
            is_default: { type: Boolean, required: false, default: false },
        },
        payping: {
            code: { type: String, required: false, default: '' },
            is_default: { type: Boolean, required: false, default: false },
        },
    },
    charity_id: {
        type: Schema.Types.ObjectId, required: false
    },
    filter_unauthorized_words: {
        type: Boolean, required: false, default: false
    },
    reqirement_data: {
        name: {
            type: Boolean,
            default: false
        },
        details: {
            type: Boolean,
            default: false
        },
        support_list: {
            type: Boolean,
            default: false
        },
        phone_number: {
            type: Boolean,
            default: false
        },
        email: {
            type: Boolean,
            default: false
        },
        terms_and_conditions: {
            type: Boolean,
            default: false
        },
        gift: {
            type: Boolean,
            default: false
        },
        show_target: {
            type: Boolean,
            default: false
        },
    },
}, {
    timestamps: true,
})

export default mongoose.model('Main_Gateway_Settings', MainGatewaySettings);