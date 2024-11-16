import {ObjectId} from "mongoose"

export interface Login_response {
    token: String
}

export interface Login_token {
    _id: ObjectId
}

export interface register_token {
    email?: String
    for: String
    username?: String
}

