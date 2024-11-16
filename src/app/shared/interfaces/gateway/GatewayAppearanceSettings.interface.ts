import { ObjectId } from 'mongodb';
import { IUser } from '../user.interface';
export interface IGatewayAppearanceSettings {
    _id: ObjectId
    user_id: ObjectId | IUser
    background_pattern_image_link?: string
    background_image_link?: string
    first_color: string
    second_color: string
    twitch_account_username?: string
    show_link_in_stram?: boolean
    social_media_inside_gateway_link: any // todo:add  social media Type
    createdAt: Date
    updatedAt: Date
}