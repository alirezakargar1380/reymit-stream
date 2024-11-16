import { ObjectId } from "mongodb"



export enum EUserActivites_Sections {
    changing_gateway_address = "changing_gateway_address",
    upload_emoji = "upload_emoji",
}


export interface IUserActivites {
    _id: ObjectId
    user_id: ObjectId
    section: EUserActivites_Sections
    before_data?: String
    after_data?: String
    data?: String
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserActivitesCreateInput extends Omit<IUserActivites, "_id" | "createdAt" | "updatedAt"> {}
export interface IUserActivitesCheckActivitesByDayInput {
    user_id: ObjectId
    section: EUserActivites_Sections,
    timestamp: {
        $gt: Date
    }
}

export interface IUserActivitesCheckActivitesBySectionInput {
    user_id: ObjectId
    section: EUserActivites_Sections
}

export interface IUserActivitesCheckActivitesForSectionInput {
    user_id: ObjectId
    section: EUserActivites_Sections,
    link: String
}

export interface IUserActivitesRemoveInput {
    user_id: ObjectId
    section: EUserActivites_Sections
}

export interface IUserActivitesCheckActivitesByTimeInput {
    user_id: ObjectId
    section: EUserActivites_Sections
    timestamp: {
        $gt: Date
    }
}