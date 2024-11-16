import {api} from "../../types/payment_methods/payment_methods";

const axios = require('axios').default;
import Exception from "./../../utils/error.utility";
import * as types from "../../types/payment_methods/payment_methods";


export default class pardakhtPay implements types.pardakhtPay {
    private api: types.api
    constructor(key: string) {
        this.api = {
            base: 'https://pay.ir/pg',
            key: 'test'
        }
    }

    async request(amount: number, callbackUrl: string, customData: any = {}) {
        customData.api = this.api.key
        customData.amount = amount
        customData.redirect = callbackUrl
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/share/send`,
            data: customData
        }).catch((e: any) => {
            throw Exception.setError('failed to get gateway from pardakhtpay', true)
        })).data

        if (response.status == 1) {
            return {token: response.token, link: `${this.api.base}/${response.token}`}
        } else {
            throw Exception.setError(`pardakhtpay: ${response.errorMessage}`, true)
        }
    }

    async verify(token: string, customData: any = {}) {
        customData.token = token
        customData.api = this.api.key
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/verify`,
            data: customData
        }).catch((e: any) => {
            throw Exception.setError(`verify failed`, true)
        })).data
        if (response.status == 1) {
            return response
        } else {
            throw Exception.setError(`pardakhtpay: ${response.errorMessage}`, true)
        }
    }
}