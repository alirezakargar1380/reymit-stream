import io from "../../../server"
import {IToolsNewSupportAlertVideoContentSettingsTool} from "./../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.interface"
import {IToolsNewSupportAlertGeneralSettings} from "./../../shared/interfaces/tools/new_event_alert/tools.new_support_alert.general_settings"
import {IDonationAlertInput} from "./../../shared/interfaces/alerts/alert_messages"
import {file_type_constant} from "./../../shared/constants/schemas/tools/tools.file_type.constant"
import {file_selection_method_constant} from "./../../shared/constants/schemas/tools/tools.file_selection_method.constant"
// Repository
import {
    tools_newEventAlert_newDonationAlert_conditions_repository,
    toolsNewEventAlert_general_settingsRepository,
    toolsNewEventAlertVideoContent_settings_content_settingsRepository,
} from "./../../shared/config"
// Package
import { ObjectId } from "mongodb"
import {
    tools_target_mainSettings,
} from "./../../shared/interfaces/tools/target/tools.target.main_settings.interface"
import {
    tools_targart_appearanceSettings,
} from "./../../shared/interfaces/tools/target/tools.target.appearance_settings.interface"
import {get_percentage_of_progress} from "./../../services/tools/target/tools.target.main_settings.service"

export const setup_settings = async (user_id: string, amount: number) => {
    amount = (amount / 10)
    let condition: any = await tools_newEventAlert_newDonationAlert_conditions_repository.getConditionByAmount(user_id, amount)
    let general_settings
    let videoContentSettingsTool
    if (condition.length === 0) {
        general_settings = await toolsNewEventAlert_general_settingsRepository.findByUserId(new ObjectId(user_id))
        videoContentSettingsTool = await toolsNewEventAlertVideoContent_settings_content_settingsRepository.findByUserId(new ObjectId(user_id))
    } else {
        condition = condition[0]
        general_settings = condition.general_settings[0]
        videoContentSettingsTool = condition.video_content_settings_tool[0]    
    }

    toolsNewEventAlert_generalSettings(user_id, general_settings)
    toolsNewEventAlert_VideoContentSettingsTool(user_id, videoContentSettingsTool)
} 

export const donation_alert = (user_id: string, message: IDonationAlertInput) => {
    let dd = `مبلغ ${message.amount} تومان حمایت کرد`
    message.donation_detail = dd
    io.to(user_id).emit("donation_alert", message)
}

export const toolsNewEventAlert_VideoContentSettingsTool = (user_id: string, message:IToolsNewSupportAlertVideoContentSettingsTool) => {
    io.to(user_id).emit("new-event-alert_videoContentSettingsTool", {
        message: message,
        file_types: file_type_constant,
        file_selection_method: file_selection_method_constant
    })
}

export const toolsNewEventAlert_generalSettings = (user_id: string, message: IToolsNewSupportAlertGeneralSettings) => {
    io.to(user_id).emit("new-event-alert_generalSettings", {
        message: message,
        file_selection_method: file_selection_method_constant
    })
}

// TARGETS
export const toolsTargetMainSettings = (user_id: string, message: tools_target_mainSettings) => {
    // if (!message.show_target) return
    io.to(user_id).emit("toolsTargets_mainSettings", {
        message: message,
        percentage_of_progress: get_percentage_of_progress(message.amount_until_now, message.target_amount)
    })
}

export const toolsTargets_appearanceSettings = (user_id: string, message: tools_targart_appearanceSettings) => {
    // console.log(message.target_detail.show_target_detail)
    io.to(user_id).emit("toolsTargets_appearanceSettings", {
        message: message,
    })
}