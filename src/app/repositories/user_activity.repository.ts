import UserActivitesSchema from "../models/user_activity.logs.model";
import {
    IUserActivites,
    IUserActivitesCreateInput,
    IUserActivitesCheckActivitesByDayInput,
    IUserActivitesCheckActivitesBySectionInput,
    IUserActivitesRemoveInput,
    IUserActivitesCheckActivitesByTimeInput
} from "../shared/interfaces/user_activites.interface";

export class UserActivitesRepository {
    constructor(private userActivitesModel:typeof UserActivitesSchema){}

    async create(activity: IUserActivitesCreateInput):Promise<IUserActivites>{
        return this.userActivitesModel.create(activity);
    }

    async get(params: IUserActivitesCheckActivitesByTimeInput):Promise<IUserActivites[]>{
        return this.userActivitesModel.find(params);
    }

    async checkActivityByDay(inputs: IUserActivitesCheckActivitesByDayInput):Promise<IUserActivites[]>{
        return this.userActivitesModel.find(inputs);
    }

    async checkActivityBySection(inputs: IUserActivitesCheckActivitesBySectionInput):Promise<IUserActivites | null>{
        return this.userActivitesModel.findOne(inputs);
    }

    async removeBySection(inputs: IUserActivitesRemoveInput):Promise<IUserActivites | null>{
        return this.userActivitesModel.findOneAndRemove(inputs);
    }
}