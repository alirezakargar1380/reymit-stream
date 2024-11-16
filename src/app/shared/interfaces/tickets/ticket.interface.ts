import { ObjectId } from "mongodb";
import { TicketStatus } from "../../constants/ticket.constant";
import { IUser } from "../user.interface";

export interface ITicket {
    _id: ObjectId
    user_id: ObjectId | IUser
    number_of_ticket: number
    subject: string
    // description: string
    status: TicketStatus
}

export interface IFindParams {
    _id: ObjectId
    user_id: ObjectId,
    subject: string,
    limit: number,
    skip: number
}

export interface ITicketCreateInput extends Omit<ITicket, "_id">{}
export interface ISearchUserByIdParams extends Omit<IFindParams, "_id"> {}
export interface IFindTicketParams extends Omit<IFindParams, "user_id"> {}
export interface IFindByUserId extends Omit<IFindParams, "_id" | "subject"> {}
export interface IFindUserTicket extends Omit<IFindParams, "subject" | "limit" | "skip"> {}