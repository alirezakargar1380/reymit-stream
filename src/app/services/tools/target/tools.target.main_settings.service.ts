import { ObjectId } from "mongodb"
// REPOSITORY
import {
    toolsTargetMainSettingsRepository
} from "./../../../shared/config";
import defaults from "./../../../shared/default/settings/tools/target/main_settings.default"

export const create_default_setting = async (user_id: ObjectId): Promise<void> => {
    await toolsTargetMainSettingsRepository.create({
        user_id: user_id, ...defaults
    })
}

export const get_percentage_of_progress = (amount_until_now: number, target_amount: number): number => {
    let percentage = Math.round((amount_until_now / target_amount) * 100)
    if (amount_until_now > target_amount) percentage = 100
    return percentage
}

export const update_amount_until_now = async (toman_amount: number, user_id: ObjectId) => {
    await toolsTargetMainSettingsRepository.updateByUserId(user_id, {
        amount_until_now: toman_amount
    })
}