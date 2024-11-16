import { IGatewayAppearanceSettings } from '../shared/interfaces/gateway/GatewayAppearanceSettings.interface';
import mongoose, {
    Schema
} from "mongoose"

const MainGatewayAppearanceSettings = new Schema<IGatewayAppearanceSettings>({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    background_pattern_image_link: {
        type: String,
        required: false,
        default: ''
    },
    background_image_link: {
        type: String,
        required: false,
        default: ''
    },
    first_color: {
        type: String,
        required: false,
        default: '#ffffff'
    },
    second_color: {
        type: String,
        required: false,
        default: '#000000'
    },
    twitch_account_username: {
        type: String,
        required: false,
        default: ''
    },
    show_link_in_stram: {
        type: Boolean,
        required: false,
        default: false
    },
    social_media_inside_gateway_link: {
        telegram: {
            type: String,
            required: false,
            default: ''
        },
        youtube: {
            type: String,
            required: false,
            default: ''
        },
        facebook: {
            type: String,
            required: false,
            default: ''
        },
        instagram: {
            type: String,
            required: false,
            default: ''
        },
        twitch: {
            type: String,
            required: false,
            default: ''
        },
        discord: {
            type: String,
            required: false,
            default: ''
        },
        aparat: {
            type: String,
            required: false,
            default: ''
        },
    }
}, {
    timestamps: true,
})

export default mongoose.model('Main_Gateway_Appearance_Settings', MainGatewayAppearanceSettings);