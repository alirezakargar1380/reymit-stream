const axios = require('axios').default;
import Exception from "./../../utils/error.utility";
import * as types from "../../types/payment_methods/payment_methods";


export default class idPay implements types.idPay {
    private api: types.api
    constructor(key: string) {
        this.api = {
            base: 'https://api.idpay.ir',
            key: key
        }
    }

    async request(amount: number, callbackUrl: string, customData: any = {}) {
        customData.amount = amount, // rial/10 to toman
        customData.callback = callbackUrl
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/v1/payment`,
            data: customData,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.api.key,
                // 'X-SANDBOX': true,
            }
        }).catch((e: any) => {
            throw Exception.setError('failed to get gateway from idpay', true)
        })).data

        if (response.id) {
            return {token: response.id, link: response.link}
        } else {
            throw Exception.setError(`failed to get gateway`, true)
        }
    }

    async verify(token: string, customData: any = {}) {
        customData.id = token
        const response = (await axios({
            method: 'post',
            url: `${this.api.base}/v1/payment/inquiry`,
            data: customData,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': this.api.key,
                // 'X-SANDBOX': true,
            }
        }).catch((e: any) => {
            throw Exception.setError('failed to verify from idpay', true)
        })).data

        if (response.status == 100) {
            return customData.refId
        } else {
            throw Exception.setError('failed to verify', true)
        }
    }
}