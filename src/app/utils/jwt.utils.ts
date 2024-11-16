import jwt from "jsonwebtoken"
import * as users_types from "./../types/users/authentication"
import {IAlertKeyInput} from "./../shared/interfaces/alerts/alert_links"
import Exception from "../utils/error.utility";

class JWT {
    private secret: string;
    constructor() {
        this.secret = process.env.JWT_SECRET || 'yrturtyutyruryuryurtyrt'
    }

    login_token(data: users_types.Login_token) {
        var token = jwt.sign(data, this.secret, {
            expiresIn: '1000h'
        });
        return token
    }

    countinue_token(data: users_types.register_token) {
        var token = jwt.sign(data, this.secret, {
            expiresIn: '1h'
        });
        return token
    }

    alert_key(data: IAlertKeyInput) {
        return jwt.sign(data, this.secret);
    }

    forget_password_token(data: any) {
        var token = jwt.sign(data, this.secret, {
            expiresIn: '15m'
        });
        return token
    }

    verify_token(token: string) {
        try {
            var decoded = jwt.verify(token, this.secret);
            return decoded
        } catch (err) {
            throw Exception.setError("invalid token", true)
        }
    }
}

export default new JWT()