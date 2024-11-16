// Schema
import UserSchema from "../../models/user.model"
import ForgetPasswordSchema from "../../models/forget_passwod_tokens"

import { Request, Response } from "express"
import JWT from "../../utils/jwt.utils"
import Exception from "../../utils/error.utility";
const responseUtils = require('./../../utils/response.utitlity');

import { UsersFields } from "../../services/database_fields/data.services";
import email_service from "../../services/emails/email.service";
import { forgetPassEmaiTemplate } from "./../../loaders/file.loader"


// const forgetPassEmaiTemplate = fs.readFileSync(path.join(__dirname, "/../../../../template/Forget Password - MyCamp.html"), {
//     encoding: "utf-8"
// })

import { IUser } from "../../shared/interfaces/user.interface";
import { getDate_of_a_minute } from "../../utils/days.utilitys";

export const forget_password = async (req: Request, res: Response) => {
    try {
        const data: IUser | null = await UserSchema.findOne({ email: req.body.email }).then((user: any) => { return user })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)
        User.reportPropertyValue('email_verification', true)

        const authentication_code = await ForgetPasswordSchema.findOne({
            email: req.body.email,
            timestamp: {
                // 5 minutes ago (from now)
                $gt: getDate_of_a_minute(5)
            }
        })
        if (authentication_code) throw Exception.setError("wait 5 minuts", true)

        const token = JWT.forget_password_token({
            email: req.body.email,
        })

        const url = `${process.env.MAIN_WEBSITE_URL}/api/forget_password/reset-password/${token}`

        const new_data = forgetPassEmaiTemplate.replace("{%LINK%}", url)

        const email = new email_service({
            html: new_data,
            subject: "Reset Password"
        })

        await email.send(req.body.email)

        responseUtils.success(res, {
            email: "sended",
        })

    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const get_reset_password = async (req: Request, res: Response) => {
    try {
        res.render("f", {
            token: req.params.token
        })
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const post_reset_password = async (req: Request, res: Response) => {
    try {
        const usedToken = await ForgetPasswordSchema.findOne({ token: req.params.token }).then((data: any) => { return data })
        if (usedToken) {
            return res.send("token is used")
        }

        if (req.body.password !== req.body.password2)
            return res.send("password not match")

        const decoded_token: any = JWT.verify_token(req.params.token)

        const data = await UserSchema.findOne({
            email: decoded_token.email
        })
        if (!data)
            return res.send("user not found")

        await UserSchema.findOneAndUpdate({
            email: decoded_token.email
        }, {
            password: req.body.password
        })

        await ForgetPasswordSchema.create({
            email: decoded_token.email,
            token: req.params.token,
        })

        res.send("sucssfuly changed")

    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}