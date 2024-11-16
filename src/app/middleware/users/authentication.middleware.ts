import { Request, Response, NextFunction } from "express"
import validation from "../../validation/users/users.validation";
import { UsersFields } from "./../../services/database_fields/data.services";
const user_services = require("../../services/users/users.services")
const responseUtils = require('./../../utils/response.utitlity');
import Exception from "../../utils/error.utility";
import JWT from "./../../utils/jwt.utils"
import UserSchema from "./../../models/user.model"

export const countinue_token_with_email = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.query.countinue_token)
            throw Exception.setError("countinue token in query", true)

        const decoded_token: any = JWT.verify_token(req.query.countinue_token as string)
        if (decoded_token.for != "register")
            throw Exception.setError("this token is not for rigister", true)

            console.log(decoded_token)
        res.locals.email = decoded_token.email

        if (decoded_token.username) {
            res.locals.username = decoded_token.username
        }

        next()
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const check_user_is_exist_with_email = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.forget_password(req.body)

        const data = await UserSchema.findOne({
            email: req.body.email
        })
            .then((result: any) => { return result })
            .catch((err: any) => {
                console.log(err)
                throw Exception.setError("internal server error", true)
            })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)

        next()
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const user_bearer_authentication = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) { 
            throw Exception.setError("you must be logged in", true)
        }

        let token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            token = req.headers.authorization
        }
        const decoded_token: any = JWT.verify_token(token)
        console.log(decoded_token)

        const data: any = await UserSchema.findOne({
            _id: decoded_token._id
        })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)
        // User.reportPropertyValue('email_verification', true)

        // responseUtils.success(res, decoded_token)
        res.locals.user_id = decoded_token._id
        next()
    } catch (e: any) {
        if (e.extensions) {
            if (e.extensions.expected_property === "active")
                return responseUtils.error(res, "your account is not active")
            if (e.extensions.expected_property === "email_verification")
                return responseUtils.error(res, "your email_verification")

            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}
