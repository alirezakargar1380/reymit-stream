import emojiSchema from "../models/emojis.model"
import {
    IEmoji,
    IEmojiCreateInput,
    IEmojiUpdateInput,
    IEmojiGetParams
} from "../shared/interfaces/emojis/emojis.interface"
import mongoose from "mongoose";
import { ObjectId } from "mongodb";


export class EmojiRepository {
    constructor(private emojiModel: typeof emojiSchema) { }

    async create(emoji: IEmojiCreateInput): Promise<IEmoji> {
        return (await this.emojiModel.create(emoji))
    }

    async getEmojisByUserId(userId: ObjectId): Promise<IEmoji[]> {
        return (await this.emojiModel.find({
            user: userId
        }))
    }

    async getEmoji(params: IEmojiGetParams): Promise<IEmoji | null> {
        return await this.emojiModel.findOne(params)
    }

    async getEmojiByIdAndUserId(userId: ObjectId, id: ObjectId): Promise<IEmoji | null> {
        return (await this.emojiModel.findOne({_id: id, user: userId}))
    }

    async updateEmojiByIdAndUserId(userId: ObjectId, id: ObjectId, data: IEmojiUpdateInput) {
        return (await this.emojiModel.updateOne({_id: id, user: userId}, data))
    }

    async deleteEmojiByIdAndUserId(userId: ObjectId, id: ObjectId) {
        return ( await this.emojiModel.deleteOne({_id: id, user: userId}) )
    }
}