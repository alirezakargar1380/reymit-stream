// @ts-ignore
const mongoose = require('mongoose');
// @ts-ignore
const Schema = mongoose.Schema;


const GatewayTargetSchema = new Schema({
    title: { type: String, required: false, default: '' },
    collectedAmount: { type: Number, required: false, default: 0 },
    targetAmount: { type: Number, required: false, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true, unique: true },
}, {
    timestamps: true
})


export default mongoose.model('GatewayTargetSchema', GatewayTargetSchema);


