import UserSchema from "../../models/user.model";
import Failed_logins_Schema from "../../models/failed_logins.model";
import Exception from "./../../utils/error.utility";
import MainGateWaySettings_Schema from "../../models/gateway_main_settings.model"
import MainGateWayAppearanceSettings_Schema from "../../models/gateway_appearance_settings.model"

import { ObjectId } from "mongodb";

// SERVICES
import * as service_Tools_Target_GeneralSettings from "./../tools/new_event_alert/tools.new_support_alert.general_settings.service"
import * as service_Tools_NewSupportAlert_VideoContentSettings from "./../tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.service"
import * as service_Tools_NewSupportAlert_AppearanceSettings from "./../tools/new_event_alert/tools.new_support_alert.appearance_settings.service"
import * as service_Tools_NewSupportAlert_SendVoiceSettings from "./../tools/new_event_alert/send_voice.settings.service"
import * as service_Tools_NewSupportAlert_SendEmojiSettings from "./../tools/new_event_alert/send_emoji.settings.service"
import * as service_Tools_NewSupportAlert from "./../tools/new_event_alert/new_event_alert.service"

import * as service_Tools_Target from "./../tools/target/tools.target.services"
import * as service_Tools_Target_MainSettings from "./../tools/target/tools.target.main_settings.service"
import * as service_Tools_Target_AppearanceSettings from "./../tools/target/tools.target.appearance_settings.service"

export const Register_new_user = async (user_id: ObjectId): Promise<void> => {
  /**
   *   @des 
   *      - tools, new support alert
   */
  await service_Tools_NewSupportAlert.create_default_setting(user_id)
  await service_Tools_NewSupportAlert_VideoContentSettings.create_default_setting(user_id)
  await service_Tools_NewSupportAlert_AppearanceSettings.create_default_setting(user_id)
  await service_Tools_Target_GeneralSettings.create_default_setting(user_id)
  await service_Tools_NewSupportAlert_SendVoiceSettings.create_default_setting(user_id)
  await service_Tools_NewSupportAlert_SendEmojiSettings.create_default_setting(user_id)

  /**
   *   @des 
   *      - tools, TARGET
   */
  await service_Tools_Target.create_default_setting(user_id)
  await service_Tools_Target_MainSettings.create_default_setting(user_id)
  await service_Tools_Target_AppearanceSettings.create_default_setting(user_id)

  /**
   *   TODO:
   *      @des 
   *        - gateway settings
   */
  // add this user main gateway settings
  await MainGateWaySettings_Schema.create({
    user_id: user_id,
  })

  // add this user appearance settings
  await MainGateWayAppearanceSettings_Schema.create({
    user_id: user_id,
  })

}

export const Register_email = async (body: any) => {
  const response = {
    message: "",
    _id: "",
  }

  const result = await UserSchema.create({
    email: body.email,
    name: body.name,
    password: body.password,
    phoneNumber: body.phoneNumber,
    displayName: body.displayName,
    username: body.username,
    active: true,
    email_verification: true
  })
    .then((d: any) => { return d })
    .catch((d: any) => {
      console.log(d)
      return d
    })

  if (result.code == 11000)
    throw Exception.setError("this email is already registered", true)
  else {
    response.message = "you can sign in"
    response._id = result._id
  }

  return response
}

export const Failed_log_by_email = async (email: string) => {
  await Failed_logins_Schema.create({
    email: email
  })
    .catch((err: any) => {
      console.log(err)
    })
}
