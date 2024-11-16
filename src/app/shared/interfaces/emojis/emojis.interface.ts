import { ObjectId } from "mongodb";

export interface IEmoji {
    _id: ObjectId,
    user: ObjectId,
    title: string,
    emoji: string,
    price: number,
    animationStyle: string,
    animationSpeed: string,
    animationCount: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IEmojiCreateInput extends Omit<IEmoji, '_id' | 'createdAt' | 'updatedAt'> { }
export interface IEmojiUpdateInput extends Omit<IEmojiCreateInput, 'user'> { }
export interface IEmojiGetParams extends Partial<IEmoji> { }
