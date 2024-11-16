import UserUploaderActivitesSchema from "../models/user_uploader_activites.logs.model";
import {
    EUserUploaderActivitesSectionsTypes,
    IUserUploaderActivites,
    IUserUploaderActivitesCreateInput
} from "../shared/interfaces/user_uploader_activites.iterface";

export class UserUploaderActivitesRepository {
    constructor(private userUploaderActivitesModel:typeof UserUploaderActivitesSchema) {}

    async create(inputs: IUserUploaderActivitesCreateInput): Promise<IUserUploaderActivites> {
        return await this.userUploaderActivitesModel.create(inputs)
    }
}