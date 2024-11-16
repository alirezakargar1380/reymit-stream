import {IUser} from "../../shared/interfaces/user.interface";
import Exception from "./../../utils/error.utility";

// module pattern
export class UsersFields {
    public data: any
    constructor(data: IUser | null) {
        if (data === null)
            this.error("this user is not exist")

        this.data = data    
    }

    reportPropertyValue(property: string, expect: boolean) {
        if (this.data[property] !== expect) {
            this.expected_error(property)
        }
    }

    expected_error(property: string) {
        throw Exception.setError({
            expected_property: property
        }, true)
    }

    error(property: string) {
        throw Exception.setError(property, true)
    }
}
