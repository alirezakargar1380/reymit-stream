import { ITicketMessage } from '../../shared/interfaces/tickets/tickets-messages.interface';
import mongoose, {
    Schema
} from "mongoose"
import { TicketAnswredBy } from '../../shared/constants/ticket.constant';

const tickets_messages_schema = new Schema<ITicketMessage>({
// const tickets_messages_schema = new Schema({
    ticket_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    description: { type: String, required: true },
    attach_file_link: { type: String, required: false },
    answred_by: { type: String, required: true, enum: TicketAnswredBy },
}, {
    timestamps: true,
})

export default mongoose.model('tickets_messages', tickets_messages_schema);