import { Router } from "express";
const router: Router = Router();
// CONTROLLER
import * as sendVoiceControllers from "../../../../controllers/tools/new_event_alert/new_donation_alert/send_voice.controller";
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 *   @TODO:
 *      - add user login check
 */

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/send_voice/settings:
 *   get:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.get("/send_voice/settings", middleware.user_bearer_authentication, sendVoiceControllers.get_sendVoice)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/send_voice/settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: body
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'voice_recording_settings': {
 *               'type': 'object',
 *               'properties': {
 *                   'active': {
 *                        'type': boolean,
 *                        'default': false
 *                   },   
 *                   'max_voice_length': {
 *                        'type': 'integer'
 *                   },   
 *                   'min_voice_length': {
 *                        'type': 'integer'
 *                   },   
 *                   'volume': {
 *                        'type': 'integer'
 *                   },   
 *                   'start_play_delay': {
 *                        'type': 'integer'
 *                   },   
 *               }
 *            },
 *         }
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/send_voice/settings", middleware.user_bearer_authentication, sendVoiceControllers.update_sendVoice)

export default router