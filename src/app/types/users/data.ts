import {ObjectId} from "mongoose"

export interface User {
    id: ObjectId
    active: boolean
    email_verification: boolean
    email: string
    password: string
    name: string
}