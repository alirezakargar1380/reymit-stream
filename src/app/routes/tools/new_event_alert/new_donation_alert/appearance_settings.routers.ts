import { Router } from "express";
const router: Router = Router();
// CONTROLLER
import * as appearanceControllers from "../../../../controllers/tools/new_event_alert/new_donation_alert/appearance.controller";
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/apperance_settings:
 *   get:
 *     tags: [Tools]
 *     description: send an email to the user for validating his email
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.get("/apperance_settings", middleware.user_bearer_authentication, appearanceControllers.get_appearanceSettings)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/apperance_settings:
 *   post:
 *     tags: [Tools]
 *     description: send an email to the user for validating his email
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'appearance_profile_of_the_sponsor_profile_box': {
 *               'type': 'object',
 *               'properties': {
 * 
 *                   'vertical_position_of_the_sponsor_profile_box': {
 *                      'type': 'string',
 *                      'default': 'top',
 *                   },
 *                   'horizonal_position_of_the_sponsor_profile_box': {
 *                      'type': 'string',
 *                      'default': 'middle',
 *                   },
 * 
 *                   'padding_top': {
 *                      'type': 'integer',
 *                   },
 *                   'padding_right': {
 *                      'type': 'integer',
 *                   },
 * 
 *                   'padding_bottom': {
 *                      'type': 'integer',
 *                   },
 *                   'padding_left': {
 *                      'type': 'integer',
 *                   },
 * 
 *                },
 *            },
 *         } 
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/apperance_settings", middleware.user_bearer_authentication, appearanceControllers.update_appearanceSettings)

export default router