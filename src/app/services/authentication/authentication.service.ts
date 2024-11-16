// REPOSITORY
import { userRepository } from "../../shared/config";
// INTERFACE  
import {IUser, IUserCreateInput, IUserSelector, IUserUpdateInput} from "./../../shared/interfaces/user.interface";
// UTILS
import Exception from "./../../utils/error.utility";
import JWT from "./../../utils/jwt.utils"

export const get_continue_token_byEmail = async (email: string): Promise<any> => {
    const user: IUser | null = await userRepository.findByEmail(email)
    if (user) throw Exception.setError("this email is already registered", true)

    return {
        countinue_token: JWT.countinue_token({
            email: email,
            for: "register"
        })
    }
}