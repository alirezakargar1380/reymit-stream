export interface api {
    base: string,
    key: string,
}

export interface api_without_base {
    key: string
}

export interface request_answer {
    token: string,
    link: string
}

export interface idPay {
    request(amount: number, callbackUrl: string, customData?: any): Promise<request_answer>,
    verify(token: string, customData: any): Promise<string>,
}

export interface zarinpal {
    request(amount: number, callbackUrl: string, customData?: any): Promise<request_answer>,
    verify(token: string, customData: any): Promise<string>,
}

export interface payPing {
    request(amount: number, callbackUrl: string, customData?: any): Promise<request_answer>,
    verify(token: string, customData: any): Promise<string>,
}

export interface pardakhtPay {
    request(amount: number, callbackUrl: string, customData?: any): Promise<request_answer>,
    verify(token: string, customData: any): Promise<string>,
}
