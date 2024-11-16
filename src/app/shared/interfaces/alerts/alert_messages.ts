import { ObjectId } from "mongodb";

export interface IDonationAlertInput {
    test: Boolean,
    details: String,
    amount: Number,
    donation_name: String,
    donation_detail?: String,
    publishName: Boolean,
    publishDesc: Boolean,
}