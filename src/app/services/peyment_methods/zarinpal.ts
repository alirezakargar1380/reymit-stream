import Exception from "./../../utils/error.utility";
import ZarinPalCheckout from "zarinpal-checkout";
import * as types from "../../types/payment_methods/payment_methods";

export default class zarinpal implements types.zarinpal {
    private api: types.api_without_base
    constructor(key: string) {
        this.api = {
            // key: key
            // this is for test
            key: "XXXXXXX-XXX-XXXX-XXXXXXXXXXXX"
        }
    }

    async request(amount: number, callbackUrl: string, customData: any = {}) {
        customData.Amount = (amount / 10), // rial/10 to toman
        customData.CallbackURL = callbackUrl

        // const zarinpal = ZarinPalCheckout.create(this.api.key, false);
        const zarinpal = ZarinPalCheckout.create(this.api.key, true); // set sendbox true for test
        return await zarinpal.PaymentRequest(customData).then((response: any) => {
            if (response.status === 100) {
                return {token: response.authority, link: response.url}
            } else {
                throw Exception.setError('failed to get gateway', true)
            }
        }).catch((err: any) => {
            throw Exception.setError('failed to get gateway from zarinpal', true)
        });
    }

    async verify(token: string, customData: any = {}) {
        customData.Authority = token
        customData.Amount = (customData.Amount / 10)
        // const zarinpal = ZarinPalCheckout.create(this.api.key, false);
        const zarinpal = ZarinPalCheckout.create(this.api.key, false); // set sendbox true for test
        return zarinpal.PaymentVerification(customData).then((response: any) => {
            if (response.status === 100) {
                return response.RefID
            } else {
                throw Exception.setError('failed to verify', true)
            }
        }).catch((err: any) => {
            throw Exception.setError('failed to verify from zarinpal', true)
        });


    }
}