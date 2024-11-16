import { ObjectId } from "mongodb"
import {
    toolsNewEventAlert_sendVoice_Repository
} from "../../../shared/config"

export const create_default_setting = async (user_id: ObjectId) => {
    await toolsNewEventAlert_sendVoice_Repository.create({
        user_id: user_id,
        voice_recording_settings: {
            active: false
        }
    })
}
