import { ObjectId } from "mongodb"

// REPOSITORY
import {
    toolsTargetRepository,
    toolsTargetMainSettingsRepository
} from "./../../../shared/config";
import JWT from "./../../../utils/jwt.utils"
 
// constants
import {alertsSections_constant} from "./../../../shared/constants/alerts/sections.constants"
import {
    tools_target_mainSettings
} from "./../../../shared/interfaces/tools/target/tools.target.main_settings.interface"

// service 
import * as socketService from "./../../../services/socket/socket.service"

export const create_default_setting = async (user_id: ObjectId): Promise<void> => {
    const token: string = JWT.alert_key({
        user_id: user_id,
        section: alertsSections_constant.targets
    })

    await toolsTargetRepository.create({
        user_id: user_id,
        key: token,
      })    
}

export const update_target = async (user_id: any, toman: any) => {
    const target: tools_target_mainSettings | null = await toolsTargetMainSettingsRepository.findByUserId(user_id)
    if (!target) return
    if (!target.active) return
    target.amount_until_now = target.amount_until_now + toman
    await toolsTargetMainSettingsRepository.updateByUserId(new ObjectId(user_id), target)
    if (!target.show_target) return
    socketService.toolsTargetMainSettings(user_id, target)
}