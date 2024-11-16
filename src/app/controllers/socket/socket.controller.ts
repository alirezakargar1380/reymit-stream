import { ObjectId } from "mongodb"
import {Socket} from "socket.io"
import {IUser} from "../../shared/interfaces/user.interface";

import {
    toolsNewEventAlertVideoContent_settings_content_settingsRepository,
    toolsNewEventAlert_general_settingsRepository,
    toolsTargetMainSettingsRepository,
    toolsTargetAppearanceSettingsRepository
} from "./../../shared/config"
import * as socketService from "./../../services/socket/socket.service"

import {
    tools_target_mainSettings
} from "./../../shared/interfaces/tools/target/tools.target.main_settings.interface"

export const socketEndpoint = async (
    socket: Socket
    , user: IUser
    ) => {

    /**
        TODO:
          every ticket that show up should check that update is showed 
          check if user buy package let it to use the socket service
    */

    const tools_newEventAlert_videoSettingsContentTool = await toolsNewEventAlertVideoContent_settings_content_settingsRepository.findByUserId(new ObjectId(user._id))
    if (!tools_newEventAlert_videoSettingsContentTool) return socket.disconnect()
    socketService.toolsNewEventAlert_VideoContentSettingsTool(user._id.toString(), tools_newEventAlert_videoSettingsContentTool)

    const tools_newEventAlert_generalSettings = await toolsNewEventAlert_general_settingsRepository.findByUserId(new ObjectId(user._id))
    if (!tools_newEventAlert_generalSettings) return socket.disconnect()
    socketService.toolsNewEventAlert_generalSettings(user._id.toString(), tools_newEventAlert_generalSettings)

    // appearchense 
    const t = await toolsTargetAppearanceSettingsRepository.findByUserId(new ObjectId(user._id))
    if (!t) return socket.disconnect()
    socketService.toolsTargets_appearanceSettings(user._id.toString(), t)

    const toolsTarget_mainSettings: tools_target_mainSettings | null = await toolsTargetMainSettingsRepository.findByUserId(new ObjectId(user._id))
    if (!toolsTarget_mainSettings) return socket.disconnect()
    socketService.toolsTargetMainSettings(user._id.toString(), toolsTarget_mainSettings)
}