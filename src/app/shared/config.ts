import {UserRepository} from "../repositories/user.repository";
import {UserActivitesRepository} from "../repositories/user_activity.repository";
import {Ticket_messagesRepository} from "../repositories/ticket_messages.repository";
import {TicketRepository} from "../repositories/ticket.repsitory";
import {DonatesRepository} from "../repositories/donates.repository";
import {ToolsTarget} from "../repositories/tools/target/tools.target.respository";
import {ToolsTargetMainSettings} from "../repositories/tools/target/tools.target.main_settings.repository";
import {ToolsTargetAppearanceSettings} from "../repositories/tools/target/tools.target.appearance_settings.repository";
import {ToolsNewEventAlertVideoContent_settings_content_settings} from "../repositories/tools/new_event_alert/tools.new_support_alert.video_content_settings_tool.repository";
import {ToolsNewEventAlert_general_settings_content_settings} from "../repositories/tools/new_event_alert/general_settings.repository";
import {ToolsNewEventAlert_appearance_settings_content_settings} from "../repositories/tools/new_event_alert/appearance_settings.repository";
import {ToolsNewEventAlert_sendVoice_settings} from "../repositories/tools/new_event_alert/send_voice.repository";
import {ToolsNewEventAlert_sendEmoji_settings} from "../repositories/tools/new_event_alert/send_emoji.repository";
import {ToolsNewEventAlertRepository} from "../repositories/tools/new_event_alert/new_support_alert.repository";
import {EmojiRepository} from "../repositories/emoji.repository";
import {LandingRepository} from "../repositories/landing.repository";
import {CodePackageRepository} from "../repositories/package/code_package.repository";
import {UsedTrialPackageRepository} from "../repositories/package/used_trial_package.repository";
import {PackageRepository} from "../repositories/package/package.repository";
import {BuyPackageRequestRepository} from "../repositories/package/buy_package_request.repository";
import {AppearanceSettingsRepository} from "../repositories/gateway/appearance_settings_schema";
import {MainSettingsRepository} from "../repositories/gateway/main_settings";
// new event alert - new support alert - conditions
import {Tools_NewEventAlert_newDonationsAlert_conditions} from "../repositories/tools/new_event_alert/new_support_alert/conditions.repository";
import {ToolsNewEventAlertConditionsGeneralSettings} from "../repositories/tools/new_event_alert/new_support_alert/conditions.general_settings.repository";
import {ToolsNewEventAlertConditionsAppearanceSettings} from "../repositories/tools/new_event_alert/new_support_alert/conditions.appearance_settings.repository";
import {ToolsNewEventAlertConditionsSendEmojiModel} from "../repositories/tools/new_event_alert/new_support_alert/conditions.send_emoji.repository";
import {ToolsNewEventAlertConditionsSendVoiceModel} from "../repositories/tools/new_event_alert/new_support_alert/conditions.send_voice.repository";
import {ToolsNewEventAlertConditionsVideoContentSettingsRespository} from "../repositories/tools/new_event_alert/new_support_alert/conditions.video_content_settings_tool.repository";



// Models
import UserSchema from "../models/user.model";
import UserActivitesModel from "../models/user_activity.logs.model";
import TicketMessagesSchema from "../models/tickets/tickets_messages.model";
import TicketSchema from "../models/tickets/tickets.model";
import donatesSchema from "../models/donates.model";
import ToolsTargetSchema from "../models/tools/target/tools.target"
import ToolsTargetMainSettingsSchema from "../models/tools/target/tools.target.main_settings.model"
import ToolsTargetAppearanceSettingsSchema from "../models/tools/target/tools.target.appearance_settings.model"
import ToolsNewEventAlertVideoContentSettingSchema from "../models/tools/new_event_alert/new_support_alert/new_support_alert.video_content_settings_tool.model"
import ToolsNewEventAlertGeneralSettingsSchema from "../models/tools/new_event_alert/new_support_alert/new_support_alert.general_settings.model"
import ToolsNewEventAlertAppearanceSettingsSchema from "../models/tools/new_event_alert/new_support_alert/new_support_alert.appearance_settings.model"
import ToolsNewEventAlertSendVoiceSettingsSchema from "../models/tools/new_event_alert/new_support_alert/new_support_alert.send_voice.model"
import ToolsNewEventAlertSendEmojiSettingsSchema from "../models/tools/new_event_alert/new_support_alert/new_support_alert.send_emoji.model"
import ToolsNewEventAlertModel from "../models/tools/new_event_alert/new_event_alerts.model"
import EmojisSchema from "../models/emojis.model"
import LandingSchema from "../models/landing.model"
import CodePackageSchema from "../models/code_package.model"
import UsedTrialPackageSchema from "../models/used_trial_package.model"
import PackageSchema from "../models/package.model"
import BuyPackageRequestSchema from "../models/buy_package_requests"
import AppearanceSettingsSchema from "../models/gateway_appearance_settings.model"
import MainSettingsSchema from "../models/gateway_main_settings.model"

// new event alert - new support alert - conditions
import ToolsNewEventAlert_NewSupportAlert_conditions_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/condition.model"
import ToolsNewEventAlert_NewSupportAlert_generalSettings_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/conditions.general_settings.model"
import ToolsNewEventAlert_NewSupportAlert_appearanceSettings_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/conditions.appearance_settings.model"
import ToolsNewEventAlert_NewSupportAlert_sendEmoji_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/conditions.send_emoji.model"
import ToolsNewEventAlert_NewSupportAlert_sendVoice_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/conditions.send_voice.model"
import ToolsNewEventAlert_NewSupportAlert_videoContentSettings_Schema from "../models/tools/new_event_alert/new_support_alert/conditions/conditions.video_content_settings_tool.model"



// Repositories
export const userRepository = new UserRepository(UserSchema)
export const ticket_messagesRepository = new Ticket_messagesRepository(TicketMessagesSchema)
export const ticketRepository = new TicketRepository(TicketSchema)
export const donateRepository = new DonatesRepository(donatesSchema)
export const toolsTargetRepository = new ToolsTarget(ToolsTargetSchema)
export const toolsTargetMainSettingsRepository = new ToolsTargetMainSettings(ToolsTargetMainSettingsSchema)
export const toolsTargetAppearanceSettingsRepository = new ToolsTargetAppearanceSettings(ToolsTargetAppearanceSettingsSchema)
export const toolsNewEventAlertVideoContent_settings_content_settingsRepository = new ToolsNewEventAlertVideoContent_settings_content_settings(ToolsNewEventAlertVideoContentSettingSchema)
export const toolsNewEventAlert_general_settingsRepository = new ToolsNewEventAlert_general_settings_content_settings(ToolsNewEventAlertGeneralSettingsSchema)
export const toolsNewEventAlert_appearance_settingsRepository = new ToolsNewEventAlert_appearance_settings_content_settings(ToolsNewEventAlertAppearanceSettingsSchema)
export const toolsNewEventAlert_sendVoice_Repository = new ToolsNewEventAlert_sendVoice_settings(ToolsNewEventAlertSendVoiceSettingsSchema)
export const toolsNewEventAlert_sendEmoji_Repository = new ToolsNewEventAlert_sendEmoji_settings(ToolsNewEventAlertSendEmojiSettingsSchema)
export const toolsNewEventAlert_Repository = new ToolsNewEventAlertRepository(ToolsNewEventAlertModel)
export const emojiRepository = new EmojiRepository(EmojisSchema)
export const landingRepository = new LandingRepository(LandingSchema)
export const codePackageRepository = new CodePackageRepository(CodePackageSchema)
export const usedTrialPackageRepository = new UsedTrialPackageRepository(UsedTrialPackageSchema)
export const packageRepository = new PackageRepository(PackageSchema)
export const buyPackageRequestRepository = new BuyPackageRequestRepository(BuyPackageRequestSchema)
export const appearanceSettingsRepository = new AppearanceSettingsRepository(AppearanceSettingsSchema)
export const mainSettingsRepository = new MainSettingsRepository(MainSettingsSchema)
// new event alert - new support alert - conditions -->> repositorys
export const tools_newEventAlert_newDonationAlert_conditions_repository = new Tools_NewEventAlert_newDonationsAlert_conditions(ToolsNewEventAlert_NewSupportAlert_conditions_Schema)
export const tools_newEventAlert_newDonationAlert_generalSettings_repository = new ToolsNewEventAlertConditionsGeneralSettings(ToolsNewEventAlert_NewSupportAlert_generalSettings_Schema)
export const tools_newEventAlert_newDonationAlert_appearanceSettings_repository = new ToolsNewEventAlertConditionsAppearanceSettings(ToolsNewEventAlert_NewSupportAlert_appearanceSettings_Schema)
export const tools_newEventAlert_newDonationAlert_sendEmoji_repository = new ToolsNewEventAlertConditionsSendEmojiModel(ToolsNewEventAlert_NewSupportAlert_sendEmoji_Schema)
export const tools_newEventAlert_newDonationAlert_sendVoice_repository = new ToolsNewEventAlertConditionsSendVoiceModel(ToolsNewEventAlert_NewSupportAlert_sendVoice_Schema)
export const tools_newEventAlert_newDonationAlert_videoContentSettings_repository = new ToolsNewEventAlertConditionsVideoContentSettingsRespository(ToolsNewEventAlert_NewSupportAlert_videoContentSettings_Schema)
export const userActivites_repository = new UserActivitesRepository(UserActivitesModel)