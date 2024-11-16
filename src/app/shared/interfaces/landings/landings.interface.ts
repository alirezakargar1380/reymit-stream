import { ObjectId } from "mongodb";

export interface ILanding {
    _id: ObjectId,
    key: string,
    title: string,
    subtitle: string,
    text: string,
    category: string,
    link: string,
    image: string,
}