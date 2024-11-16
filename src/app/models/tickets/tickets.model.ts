import { ITicket } from '../../shared/interfaces/tickets/ticket.interface';
import { TicketAnswredBy, TicketStatus } from '../../shared/constants/ticket.constant';
import mongoose, {
    Schema
} from "mongoose"

const tickets_schema = new Schema<ITicket>({
    user_id: { type: Schema.Types.ObjectId, required: true },
    number_of_ticket: { type: Number, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true, enum: TicketStatus, default: TicketStatus.waiting_to_answer },
}, {
    timestamps: true,
})

tickets_schema.index({
    subject: 'text',
});
const model = mongoose.model('tickets', tickets_schema);
model.createIndexes();

export {
    model as default
}