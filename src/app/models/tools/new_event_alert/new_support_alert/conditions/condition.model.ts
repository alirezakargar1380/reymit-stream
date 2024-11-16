import { model, Schema } from "mongoose"

import {
    conditions_enums
} from "./../../../../../shared/constants/schemas/tools/new_event_alert/new_support_alert/conditions.constant"
import {
    IToolsNewDonationConditions
} from "./../../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.interface"

export default model("tools.new_event_alert.new_support_alert.conditions", new Schema<IToolsNewDonationConditions>({
    user_id: { type: Schema.Types.ObjectId, required: true },
    type_of_conditions: {
        type: String,
        required: true,
        enum: conditions_enums,
        default: conditions_enums.amount_of_support_greater_than_or_equal_to_an_amount
    },
    amount: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true,
}))