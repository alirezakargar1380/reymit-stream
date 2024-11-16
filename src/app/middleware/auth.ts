import JWT from "../utils/jwt.utils"
import * as users_types from "../types/users/authentication"
import { Request, Response } from "express";
import Exception from '../utils/error.utility';
const responseUtils = require('../utils/response.utitlity');

export default (req: Request, res: Response, next: any) => {
    try {
        if ('jwt' in req.body) {
            // @ts-ignore
            const decodedToken: users_types.Login_token = JWT.verify_token(req.body.jwt);
            const userId = decodedToken._id;
            if ('userid' in req.body && req.body.userid == userId) {
                next();
            } else {
                throw Exception.setError('access denied', true);
            }
        } else {
            throw Exception.setError('access denied', true);
        }
    } catch (e: any) {
        if (e.extensions) {
            responseUtils.error(res, e.extensions)
        } else {
            responseUtils.error(res, "internal server error")
        }
    }
};