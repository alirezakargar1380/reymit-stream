// Schema
import UserSchema from "../../models/user.model"
// import authentication_code_Schema from "../../models/authentication_code.model"
import Failed_logins_Schema from "../../models/failed_logins.model";

// Utils
import * as responseUtils from './../../utils/response.utitlity'
import Exception from "../../utils/error.utility";
import JWT from "../../utils/jwt.utils"
import Log from "../../utils/log.utility";

// URL
import * as google_auth from "../../url/google/auth.google"

// Packages
import { Request, Response } from "express"
import querystring from "querystring"
import axios from "axios";
import { ObjectId } from "mongodb"

// Validation
import validation from "../../validation/users/users.validation";

// Services
import * as user_services from "../../services/users/users.services";
import email_service from "../../services/emails/email.service";
import * as service_auth from "../../services/authentication/authentication.service";
import { UsersFields } from "../../services/database_fields/data.services";

// INTERFACE
import * as users_types from "../../types/users/authentication"
import { IUser } from "../../shared/interfaces/user.interface";

// TEMPLATE
import { welcomeEmaiTemplate } from "../../loaders/file.loader";

// const welcomeEmaiTemplate = fs.readFileSync(path.join(__dirname, "/../../../../template/Welcome- MyCamp.html"), {
//     encoding: "utf-8"
// })

export const register = async (req: Request, res: Response) => {
    try {
       /**
        *   TODO:
        *       - validation
        */ 
        const { email } = res.locals
        validation.check_email(res.locals)
        // validation.register(req.body)

        if (req.body.password !== req.body.confirm_password) {
            throw Exception.setError("password and confirm password not match", true)
        }

        // check this eamil is register before or not
        const user = await user_services.Register_email({
            email: email,
            password: req.body.password,
            name: req.body.name,
            username: req.body.username,
            phoneNumber: req.body.phoneNumber,
            displayName: req.body.displayName,
            has_accepted_terms: req.body.has_accepted_terms,
        })

        await user_services.Register_new_user(new ObjectId(user._id))
        
        const welcome_email = new email_service({
            html: welcomeEmaiTemplate,
            subject: "welcome to MyCamp"
        })
        await welcome_email.send(email)

        responseUtils.success(res, "registred!")
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const register_email = async (req: Request, res: Response) => {
    try {
        validation.check_email(req.body)

        // check this eamil is register before or not
        const user: IUser | null = await UserSchema.findOne({
            email: req.body.email
        })
        if (user) throw Exception.setError("this email is already register", true)

        const countinue_token = JWT.countinue_token({
            email: req.body.email,
            for: "register"
        })

        const email = new email_service({
            text: countinue_token
        })
        await email.send(req.body.email)

        // send this continue token to body.email
        responseUtils.success(res, "send")

    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const login_email = async (req: Request, res: Response) => {
    try {
        validation.email_login(req.body)

        const failed_Login_counts = await Failed_logins_Schema.countDocuments({
            email: req.body.email,
            timestamp: {
                // 1 minutes ago (from now)
                $gt: new Date(new Date().getTime() - 1000 * 60 * 1)
            }
        })

        if (failed_Login_counts >= 3) {
            throw Exception.setError({
                message: "you have failed to login too many times, please try again later",
            }, true)
        }

        const data = await UserSchema.findOne({
            email: req.body.email
        })
            .then((d: any) => { return d })
            .catch((e: any) => {
                console.error(e)
                throw Exception.setError("internal error", true)
            })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)
        // User.reportPropertyValue('email_verification', true)
        User.reportPropertyValue('password', req.body.password)

        let response_data: users_types.Login_response = {
            token: JWT.login_token({
                _id: data._id
            })
        }

        responseUtils.success(res, response_data)
    } catch (e: any) {
        // console.log(e)
        if (e.extensions) {
            if (e.extensions.message)
                return responseUtils.error(res, e.extensions)
            if (e.extensions.expected_property === "active")
                return responseUtils.error(res, "your account is not active")
            if (e.extensions.expected_property === "email_verification")
                return responseUtils.error(res, "your email_verification")
            if (e.extensions.expected_property === "password") {
                Log.info("wrong pass")
                await user_services.Failed_log_by_email(req.body.email)
            }

            responseUtils.error(res, "username or password is incorrect")
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const register_google_url = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res,
            google_auth.getGoogleAuthURL(`${process.env.MAIN_WEBSITE_URL}/api/authentication/register/google/redirect`))
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const login_google_url = async (req: Request, res: Response) => {
    try {
        responseUtils.success(res,
            google_auth.getGoogleAuthURL(`${process.env.MAIN_WEBSITE_URL}/api/authentication/login/google/redirect`))
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const login_redirect_google = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string

        const { id_token, access_token } = await google_auth.getTokens({
            code,
            clientId: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`,
            redirectUri: `${process.env.MAIN_WEBSITE_URL}/api/authentication/login/google/redirect`,
        })

        const googleUser = await google_auth.getGoogleUser(id_token, access_token)
        if (!googleUser.verified_email)
            throw Exception.setError("your google account dosent verfied", true)

        const data = await UserSchema.findOne({
            email: googleUser.email
        }).then((d: any) => {
            return d
        }).catch((e: any) => {
            console.error(e)
            throw Exception.setError("internal error", true)
        })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)
        // User.reportPropertyValue('email_verification', true)

        let response_data: users_types.Login_response = {
            token: JWT.login_token({
                _id: data._id
            })
        }

        responseUtils.success(res, response_data)
    } catch (e: any) {
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const register_redirect_google = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string

        const { id_token, access_token } = await google_auth.getTokens({
            code,
            clientId: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
            clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`,
            redirectUri: `${process.env.MAIN_WEBSITE_URL}/api/authentication/register/google/redirect`,
        })

        const googleUser = await google_auth.getGoogleUser(id_token, access_token)
        if (!googleUser.verified_email)
            throw Exception.setError("your google account dosent verfied", true)

        responseUtils.success(res, await service_auth.get_continue_token_byEmail(googleUser.email))

    } catch (e: any) {
        console.log(e)
        console.error("we have an error")
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const register_twitch_url = async (req: Request, res: Response) => {
    try {
        const rootLink = "https://id.twitch.tv/oauth2/authorize"
        responseUtils.success(res, `${rootLink}?${querystring.stringify({
            redirect_uri: `${process.env.MAIN_WEBSITE_URL}/api/authentication/register/twitch/redirect`,
            client_id: `${process.env.TWITCH_AUTH_CLIENT_ID}`,
            response_type: "code",
            scope: "user_read"
        })}`)
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const login_twitch_url = async (req: Request, res: Response) => {
    try {

        const rootLink = "https://id.twitch.tv/oauth2/authorize"
        responseUtils.success(res, `${rootLink}?${querystring.stringify({
            redirect_uri: `${process.env.MAIN_WEBSITE_URL}/api/authentication/login/twitch/redirect`,
            client_id: `${process.env.TWITCH_AUTH_CLIENT_ID}`,
            response_type: "code",
            scope: "user_read"
        })}`)
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const register_twitch_redirect = async (req: Request, res: Response) => {
    try {
        const user = await axios({
            method: "post",
            url: "https://id.twitch.tv/oauth2/token",
            data: {
                client_id: `${process.env.TWITCH_AUTH_CLIENT_ID}`,
                client_secret: `${process.env.TWITCH_AUTH_CLIENT_SECRET}`,
                code: req.query.code,
                grant_type: "authorization_code",
                redirect_uri: `${process.env.MAIN_WEBSITE_URL}/api/authentication/register/twitch/redirect`,
            }
        }).then((response: any) => {
            return response.data
        })

        const rd = await axios.get("https://api.twitch.tv/helix/users", {
            headers: {
                "Client-ID": `${process.env.TWITCH_AUTH_CLIENT_ID}`,
                "Authorization": `Bearer ${user.access_token as string}`
            }
        }).then((response: any) => {
            return response.data.data[0]
        })

        responseUtils.success(res, await service_auth.get_continue_token_byEmail(rd.email))
        
    } catch (e: any) {
        console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

export const login_twitch_redirect = async (req: Request, res: Response) => {
    try {
        const user = await axios({
            method: "post",
            url: "https://id.twitch.tv/oauth2/token",
            data: {
                client_id: "yctv1asenzzo3fbiz6p9lnletmly6v",
                client_secret: "o2uynqwqyq6sw9a5itzi91wwca45uv",
                code: req.query.code,
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:3000/api/authentication/register/twitch/redirect",
            }
        }).then((response: any) => {
            console.log(response.data)
            return response.data
        })

        const rd = await axios.get("https://api.twitch.tv/helix/users", {
            headers: {
                "Client-ID": `${process.env.TWITCH_AUTH_CLIENT_ID}`,
                "Authorization": `Bearer ${user.access_token as string}`
            }
        }).then((response: any) => {
            return response.data.data[0]
        })

        const data = await UserSchema.findOne({
            email: rd.email
        }).then((d: any) => {
            return d
        }).catch((e: any) => {
            console.error(e)
            throw Exception.setError("internal error", true)
        })

        const User = new UsersFields(data)
        User.reportPropertyValue('active', true)
        // User.reportPropertyValue('email_verification', true)

        let response_data: users_types.Login_response = {
            token: JWT.login_token({
                _id: data._id
            })
        }

        responseUtils.success(res, response_data)

    } catch (e: any) {
        // console.log(e)
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
}

