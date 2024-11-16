import { Router } from "express";
const router: Router = Router();
// CONTROLLER
import * as sendEmojiControllers from "../../../../controllers/tools/new_event_alert/new_donation_alert/send_emoji.controller";
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/send_emoji/settings:
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
router.get("/send_emoji/settings", middleware.user_bearer_authentication, sendEmojiControllers.get_sendEmoji)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/send_emoji/settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'general_settings': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'active': {
 *                           'type': 'boolean',
 *                           'default': true
 *                      },      
 *                      'placemant_position': {
 *                           'type': 'string',
 *                      }   
 *                 }
 *            }
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/send_emoji/settings", middleware.user_bearer_authentication, sendEmojiControllers.update_sendEmoji)

export default router