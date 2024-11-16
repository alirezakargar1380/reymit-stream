import { ObjectId } from "mongodb";
import Tickets_messagesSchema from "../models/tickets/tickets_messages.model";
import {
    ITicketMessagesAggregateByTicketId,
    ITicketMessage
} from "../shared/interfaces/tickets/tickets-messages.interface";

export class Ticket_messagesRepository {
    constructor(private tickets_messagesModel: typeof Tickets_messagesSchema) { }

    async create(ticket_messages: ITicketMessage): Promise<ITicketMessage> {
        return await this.tickets_messagesModel.create(ticket_messages)
    }

    async aggregateByTicketId(ticket_id: string): Promise<ITicketMessagesAggregateByTicketId[] | null> {
        return await this.tickets_messagesModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $match: {
                    // ticket_id: {
                    //     $eq: {
                    //         $toObjectId: ticket_id.toString()
                    //     }
                    // }
                    $expr: { $eq: [ '$ticket_id' , { $toObjectId: ticket_id } ] }
                }
            },
            {
                $sort: {
                    _id: -1
                }
            }
        ])
    }
}