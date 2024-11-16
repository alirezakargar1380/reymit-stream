import { ObjectId } from 'mongodb';
import { model, Schema } from 'mongoose'

export enum EUserUploaderActivitesSectionsTypes {
    image = "image",
    audio = "audio",
    video = "video"
}

// export enum EUserUploaderActivitesSections {
//     upload_condition = "upload_condition",

//     upload_newDonationAlert_generalSettings = "upload_newDonationAlert_generalSettings",

//     upload_newDonationAlert_videoContentSettings_backgroundContentSponsorProfile = "upload_newDonationAlert_videoContentSettings_backgroundContentSponsorProfile",
//     upload_newDonationAlert_videoContentSettings_contentBelowSponsorProfile = "upload_newDonationAlert_videoContentSettings_contentBelowSponsorProfile",
//     upload_newDonationAlert_videoContentSettings_otherTop = "upload_newDonationAlert_videoContentSettings_otherTop",
//     upload_newDonationAlert_videoContentSettings_otherRight = "upload_newDonationAlert_videoContentSettings_otherRight",
//     upload_newDonationAlert_videoContentSettings_otherLeft = "upload_newDonationAlert_videoContentSettings_otherLeft",
//     upload_newDonationAlert_videoContentSettings_otherBottom = "upload_newDonationAlert_videoContentSettings_otherBottom",
// }

export interface IUserUploaderActivites {
    _id: ObjectId
    user_id: ObjectId
    key: String
    type: String
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserUploaderActivitesCreateInput extends Omit<IUserUploaderActivites, "_id" | "createdAt" | "updatedAt"> {}