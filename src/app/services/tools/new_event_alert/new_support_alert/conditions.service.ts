// interfaces
import { IToolsNewDonationConditions, IToolsNewDonationConditionsCreated, IToolsNewDonationConditionsUpdated } from "./../../../../shared/interfaces/tools/new_event_alert/new_support_alert/conditions.interface"

// repositorys
import {
    tools_newEventAlert_newDonationAlert_conditions_repository,
    tools_newEventAlert_newDonationAlert_generalSettings_repository,
    tools_newEventAlert_newDonationAlert_appearanceSettings_repository,
    tools_newEventAlert_newDonationAlert_sendEmoji_repository,
    tools_newEventAlert_newDonationAlert_sendVoice_repository,
    tools_newEventAlert_newDonationAlert_videoContentSettings_repository
} from "./../../../../shared/config"
import { ObjectId } from "mongodb"
import Exception from "./../../../../utils/error.utility";

// Validation
import conditionValidation from "./../../../../validation/tools/new_event_alert/new_support_alert/conditions/conditions.validation"

export const create_condition = async (inputs: IToolsNewDonationConditionsCreated): Promise<IToolsNewDonationConditionsCreated> => {
    conditionValidation.create(inputs)

    const condition: IToolsNewDonationConditions = await tools_newEventAlert_newDonationAlert_conditions_repository.create(inputs)
    const general: any = await tools_newEventAlert_newDonationAlert_generalSettings_repository.create({ ...inputs.general_settings, condition_id: condition._id })
    const appearance: any = await tools_newEventAlert_newDonationAlert_appearanceSettings_repository.create({ ...inputs.appearance_settings, condition_id: condition._id })
    const emoji: any = await tools_newEventAlert_newDonationAlert_sendEmoji_repository.create({ ...inputs.send_emoji, condition_id: condition._id })
    const voice: any = await tools_newEventAlert_newDonationAlert_sendVoice_repository.create({ ...inputs.send_voice, condition_id: condition._id })
    const video_content: any = await tools_newEventAlert_newDonationAlert_videoContentSettings_repository.create({ ...inputs.video_content_settings_tool, condition_id: condition._id })

    return {
        _id: condition._id,
        user_id: inputs.user_id,
        type_of_conditions: condition.type_of_conditions,
        amount: condition.amount,
        general_settings: general,
        appearance_settings: appearance,
        send_emoji: emoji,
        send_voice: voice,
        video_content_settings_tool: video_content
    }
}

export const update_conditions = async (inputs: IToolsNewDonationConditionsUpdated): Promise<void> => {
    conditionValidation.update(inputs)
    await tools_newEventAlert_newDonationAlert_conditions_repository.updateById(inputs._id, inputs)
    
    if (inputs.general_settings)
        await tools_newEventAlert_newDonationAlert_generalSettings_repository.updateByConditionId(inputs._id, inputs.general_settings)
    
    if (inputs.appearance_settings)
        await tools_newEventAlert_newDonationAlert_appearanceSettings_repository.updateByConditionId(inputs._id, inputs.appearance_settings)

    if (inputs.send_emoji)
        await tools_newEventAlert_newDonationAlert_sendEmoji_repository.updateByConditionId(inputs._id, inputs.send_emoji)

    if (inputs.send_voice)
        await tools_newEventAlert_newDonationAlert_sendVoice_repository.updateByConditionId(inputs._id, inputs.send_voice)

    if (inputs.video_content_settings_tool)
        await tools_newEventAlert_newDonationAlert_videoContentSettings_repository.updateByConditionId(inputs._id, inputs.video_content_settings_tool)
}

export const delete_condition = async (condition_id: ObjectId): Promise<void> => {
    await tools_newEventAlert_newDonationAlert_conditions_repository.deleteById(condition_id)
    await tools_newEventAlert_newDonationAlert_generalSettings_repository.deleteByConditionId(condition_id)
    await tools_newEventAlert_newDonationAlert_appearanceSettings_repository.deleteByConditionId(condition_id)
    await tools_newEventAlert_newDonationAlert_sendEmoji_repository.deleteByConditionId(condition_id)
    await tools_newEventAlert_newDonationAlert_sendVoice_repository.deleteByConditionId(condition_id)
    await tools_newEventAlert_newDonationAlert_videoContentSettings_repository.deleteByConditionId(condition_id)
}

export const checkConditionUser = async (condition_id: ObjectId, user_id: ObjectId): Promise<void> => {
    const condition: IToolsNewDonationConditions | null = await tools_newEventAlert_newDonationAlert_conditions_repository.findOne({ user_id: user_id, _id: condition_id })
    if (!condition) throw Exception.setError("condition not found", true)
}