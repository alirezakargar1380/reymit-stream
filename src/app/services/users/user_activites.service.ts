// Repository
import { ObjectId } from "mongodb"
import {
    userActivites_repository
} from "../../shared/config"
import Exception from "../../utils/error.utility";

// INTERFACE
import { IUserActivitesCreateInput, IUserActivitesCheckActivitesByDayInput, IUserActivites,
    IUserActivitesCheckActivitesBySectionInput, IUserActivitesRemoveInput, IUserActivitesCheckActivitesForSectionInput,
    IUserActivitesCheckActivitesByTimeInput
} from "./../../shared/interfaces/user_activites.interface"

import { EUserActivites_Sections } from "./../../shared/interfaces/user_activites.interface";

export const add_activity = async (inputs: IUserActivitesCreateInput) => {
    await userActivites_repository.create(inputs)
}

export const check_activity_byCreateDay = async (params: IUserActivitesCheckActivitesByDayInput): Promise<boolean> => {
    const resutl: null | IUserActivites[] = await userActivites_repository.checkActivityByDay(params)
    if (!resutl || resutl.length === 0)
        return true
    else
        return false
}

export const get_activityBySection = async (params: IUserActivitesCheckActivitesBySectionInput): Promise<IUserActivites | null> => {
    return await userActivites_repository.checkActivityBySection(params)
}

export const checkActivitYForSection = async (params: IUserActivitesCheckActivitesForSectionInput) => {
    const activity: IUserActivites | null = await userActivites_repository.checkActivityBySection({
        user_id: params.user_id,
        section: params.section
    })

    if (!activity) throw Exception.setError(`activity on section ${params.section} was not found!`, true)
    if (activity.data !== params.link) throw Exception.setError("this link is not for this section", true)
}

export const checkActivitYByTime = async (params: IUserActivitesCheckActivitesByTimeInput) => {
    const activity: IUserActivites[] = await userActivites_repository.get(params)
    console.log(activity.length)
    if (activity.length >= 2 ) throw Exception.setError(`you reach the limit`, true)
}

export const removeBySection = async (params: IUserActivitesRemoveInput) => {
    console.log(await userActivites_repository.removeBySection(params))
}