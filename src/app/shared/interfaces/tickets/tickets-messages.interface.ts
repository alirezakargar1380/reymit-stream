import { ITicket } from './ticket.interface';
import { ObjectId } from 'mongodb';
import { IUser } from '../user.interface';
import { TicketAnswredBy } from '../../constants/ticket.constant';

export interface ITicketMessage {
    _id?: ObjectId
    ticket_id: ObjectId
    user_id: ObjectId
    description: string
    attach_file_link?: string | null
    answred_by: TicketAnswredBy
}

export interface ITicketMessagesAggregateByTicketId extends ITicketMessage {user: IUser}
