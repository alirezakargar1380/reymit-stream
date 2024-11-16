import express, { Router } from "express";
const router: Router = express.Router();
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "../config/swaggeroptions";

// ROUTERS
import userRouters from "./user.routers";
import gatewayRouters from "./gateway.routers";
import forgetRouters from "./forget.routers";
import packageRouters from "./package.routers";
import authenticationRouters from "./authentication.routers";
import ticketsRouters from "./tickets.routers";
import donatesRouters from "./donate.routers";
import toolsTarget_mainSettings_Routers from "./tools/new_event_alert/target/tools.target.routers";
import emojisRouters from "./emoji.routers";
import landingsRouters from "./landing.routers";

import toolsNewEventAlert_newSupportAlert_videoContentSettings_Routers from "./tools/new_event_alert/new_donation_alert/video_content_settings_tool.routers";
import toolsNewEventAlert_newSupportAlert_generalSettings_Routers from "./tools/new_event_alert/new_donation_alert/general_settings.routers";
import toolsNewEventAlert_newSupportAlert_appearanceSettings_Routers from "./tools/new_event_alert/new_donation_alert/appearance_settings.routers";
import toolsNewEventAlert_newSupportAlert_sendEmojiSettings_Routers from "./tools/new_event_alert/new_donation_alert/sendEmoji_settings.routers";
import toolsNewEventAlert_newSupportAlert_sendVoiceSettings_Routers from "./tools/new_event_alert/new_donation_alert/sendVoice_settings.routers";

import toolsNewEventAlert_newSupportAlert_conditions_Routers from "./tools/new_event_alert/new_donation_alert/condition/conditions.routers";

import tools_Routers from "./tools/tools.routers";
import alerts_Routers from "./alert.routers";
import overlay_Routers from "./overlay.routers";

// app routers
router.use("/users", userRouters);
router.use("/overlay", overlay_Routers);
router.use("/authentication", authenticationRouters);
router.use("/gateway", gatewayRouters);
router.use("/forget_password", forgetRouters);
router.use("/packages", packageRouters);
router.use("/tickets", ticketsRouters);
router.use("/donates", donatesRouters);
router.use("/tools/target", toolsTarget_mainSettings_Routers);
router.use("/tools",
    alerts_Routers,
    tools_Routers
);
router.use("/tools/new_event_alert/new_support_alert",
    toolsNewEventAlert_newSupportAlert_videoContentSettings_Routers,
    toolsNewEventAlert_newSupportAlert_generalSettings_Routers,
    toolsNewEventAlert_newSupportAlert_appearanceSettings_Routers,
    toolsNewEventAlert_newSupportAlert_sendVoiceSettings_Routers,
    toolsNewEventAlert_newSupportAlert_sendEmojiSettings_Routers,

    toolsNewEventAlert_newSupportAlert_conditions_Routers
);

router.use("/emojis", emojisRouters);
router.use("/landings", landingsRouters);

// swagger
router.use("/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerJsDoc(swaggerOptions))
);

export default router;