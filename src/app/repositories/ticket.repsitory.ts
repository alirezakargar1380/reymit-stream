import { ObjectId } from "mongodb";
import TicketsSchema from "../models/tickets/tickets.model";
import { 
    ITicket,
    IFindParams,
    ISearchUserByIdParams,
    IFindByUserId,
    IFindUserTicket,
    ITicketCreateInput
} from "../shared/interfaces/tickets/ticket.interface";

export class TicketRepository {
    constructor(private ticketsModel: typeof TicketsSchema) { }

    async create(ticket: ITicketCreateInput): Promise<ITicket> {
        return await this.ticketsModel.create(ticket);
    }

    async findOneById(_id: ObjectId): Promise<ITicket | null> {
        return await this.ticketsModel.findOne({
            _id: _id
        })
    }

    async findUserTickets(params: IFindUserTicket): Promise<ITicket[] | null> {
        return await this.ticketsModel.find({
            _id: params._id,
            user_id: params.user_id
        })
            //.skip(params.skip).limit(params.limit)
    }

    async updateById(_id: ObjectId, ticket: ITicket): Promise<ITicket | null> {
        return await this.ticketsModel.findOneAndUpdate({
            _id: _id,
        }, { $set: { ...ticket } });
    }

    async findUserTicket(params: IFindUserTicket): Promise<ITicket | null> {
        return await this.ticketsModel.findOne({
            _id: params._id,
            user_id: params.user_id
        })
            //.skip(params.skip).limit(params.limit)
    }

    async searchByUserId(params: ISearchUserByIdParams): Promise<ITicket[] | null> {
        return await this.ticketsModel.find({
            $text: {
                // $search: params.subject
                $search: `\"${params.subject}\"`
            },
            user_id: params.user_id
        })
            .skip(params.skip)
            .limit(params.limit)
            .sort({
                _id: -1
            })
    }

    async findByUserId(params: IFindByUserId): Promise<ITicket[] | null> {
        return await this.ticketsModel.find({
            user_id: params.user_id
        })
            .skip(params.skip)
            .limit(params.limit)
            .sort({
                _id: -1
            })
    }
}