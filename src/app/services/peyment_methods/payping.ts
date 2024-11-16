const axios = require('axios').default;
import Exception from "./../../utils/error.utility";
import * as types from "../../types/payment_methods/payment_methods";


export default class payPing implements types.payPing {
    private api: types.api
    constructor(key: string) {
        this.api = {
            base: 'https://api.payping.ir',
            key: key
        }
    }

    async request(amount: number, callbackUrl: string, customData: any = {}) {
        customData.amount = (amount / 10), // rial/10 to toman
        customData.returnUrl = callbackUrl
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/v2/pay`,
            data: customData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.api.key
            }
        }).catch((e: any) => {
            throw Exception.setError('failed to get gateway from payping', true)
        })).data

        if (response.code) {
            return {token: response.code, link: `${this.api.base}/v2/pay/gotoipg/${response.code}`}
        } else {
            throw Exception.setError(`failed to get gateway`, true)
        }
    }

    async verify(token: string, customData: any = {}) {
        customData.refId = token
        customData.amount = (customData.amount / 10)
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/v2/pay/verify`,
            data: customData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.api.key
            }
        }).catch((e: any) => {
            throw Exception.setError('failed to verify from payping', true)
        })).data

        if (response.amount == customData.amount) {
            return customData.refId
        } else {
            throw Exception.setError('failed to verify', true)
        }
    }
}