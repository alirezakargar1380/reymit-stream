import { ObjectId } from 'mongodb';
import { IUser } from '../user.interface';
import { IGateways } from './gateways.interface';
interface IReqirement_data {
    name?: Boolean
    details?: Boolean
    support_list?: Boolean
    phone_number?: Boolean
    email?: Boolean
    terms_and_conditions?: Boolean
    gift?: Boolean
    show_target?: Boolean
}
export interface IGatewayMainSettings {
    _id: ObjectId
    user_id: ObjectId | IUser
    minimum_amount_of_support: number
    maximux_amount_of_support: number
    currency_support: boolean
    filter_amount_of_support: boolean
    deposit_support_to_id: string
    maximum_amount_of_payment_to_confirm_the_phone_number: number
    need_confirm_the_phone_number_before_payment: boolean
    gateway_logo: string
    gateways: {
        zarinpal: IGateways
        idpay: IGateways
        pardakhtpay: IGateways
        payping: IGateways
    }
    charity_id?: ObjectId
    filter_unauthorized_words: boolean
    reqirement_data: IReqirement_data
    createdAt: Date
    updatedAt: Date
}