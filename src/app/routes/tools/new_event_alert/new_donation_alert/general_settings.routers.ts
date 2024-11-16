import { Router } from "express";
const router: Router = Router();
// CONTROLLER
import * as videoContentSettingsToolControllers from "../../../../controllers/tools/new_event_alert/new_donation_alert/general_settings.controllers";
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 *   @TODO:
 *      - add user login check
 */

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/general/settings:
 *   get:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get new support alert general settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.get("/general/settings", middleware.user_bearer_authentication, videoContentSettingsToolControllers.get_general_settings)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/general/settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: update new support alert general settings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'new_donate_alert_sound': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'file_selection_method': {
 *                           'type': 'string',
 *                           'default': 'file_direct_link'
 *                      },      
 *                      'link_or_name_of_file': {
 *                           'type': 'string',
 *                      },      
 *                      'sound_volume': {
 *                           'type': 'integer',
 *                           'default': 100
 *                      },      
 *                 }
 *            },   
 *            'timing': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'alert_show_time': {
 *                           'type': 'integer',
 *                           'default': 5
 *                      },      
 *                      'alert_delay_time': {
 *                           'type': 'integer',
 *                           'default': 0
 *                      },      
 *                      'show_delay_sponser_details': {
 *                           'type': 'integer',
 *                           'default': 0
 *                      },      
 *                 }
 *            },   
 *            'sponser_descreption': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'show_sponser_description': {
 *                           'type': 'boolean',
 *                           'default': false
 *                      },      
 *                 }
 *            },   
 *            'video_content': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'limit_the_height_and_width_of_video_content': {
 *                           'type': 'boolean',
 *                           'default': false
 *                      },      
 *                 }
 *            },   
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/general/settings", middleware.user_bearer_authentication, videoContentSettingsToolControllers.update_general_settings)

export default router