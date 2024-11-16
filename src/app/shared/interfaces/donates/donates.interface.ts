import { ObjectId } from "mongodb";


export interface Ifilter {
    displayName?: {},
    paymentMethod?: string,
    updatedAt?: {},
    amount_irr?: {},
    publishName?: boolean,
    publishDesc?: boolean,
    publishNameInDonatorList?: boolean
}

export interface Idonates {
    _id: ObjectId,
    userId: ObjectId,
    amount_irr: number,
    displayName: string,
    email: string,
    phoneNumber: string,
    description: string,
    publishName: boolean,
    publishDesc: boolean,
    publishNameInDonatorList: boolean,
    verified: boolean,
    paymentMethod: string,
    transid: string,
    token: string,
    has_accepted_terms: boolean
}

export interface IDonateCreateInput extends Omit<Idonates, 'verified' | 'transid'> { }