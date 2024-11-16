import {Router} from "express"
const router: Router = Router()

import * as targetMainSettingsController from "../../../../controllers/tools/target/tools.target.main_settings.controller"
import * as targetAppearanceSettingsController from "../../../../controllers/tools/target/tools.target.appearance_settings.controller"
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 * TODO:
 *   - Authorization
*/

/**
 * @swagger
 * /api/tools/target/main_settings:
 *   get:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get main settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *            'success': {
 *               'type': 'boolean'
 *            },
 *            'data': {
 *                'type': 'string'
 *            }
 *         }
 */
router.get("/main_settings", middleware.user_bearer_authentication, targetMainSettingsController.get_tools_target_main_settings)

/**
 * @swagger
 * /api/tools/target/main_settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get main settings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'active': {
 *               'type': 'boolean',
 *             },
 *            'show_target': {
 *               'type': 'boolean',
 *             },
 *            'target_title': {
 *               'type': 'string',
 *             },
 *            'target_amount': {
 *               'type': 'number',
 *             },
 *            'amount_until_now': {
 *               'type': 'number',
 *             },
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *            'success': {
 *               'type': 'boolean'
 *            },
 *            'data': {
 *                'type': 'string'
 *            }
 *         }
 */
router.post("/main_settings", middleware.user_bearer_authentication, targetMainSettingsController.update_tools_target_main_settings)

/**
 * @swagger
 * /api/tools/target/main_settings/reset:
 *   put:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get main settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *            'success': {
 *               'type': 'boolean'
 *            },
 *            'data': {
 *                'type': 'string'
 *            }
 *         }
 */
router.put("/main_settings/reset", middleware.user_bearer_authentication, targetMainSettingsController.reset_tools_target_main_settings)

/**
 * @swagger
 * /api/tools/target/appearance_settings:
 *   get:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get main settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *            'success': {
 *               'type': 'boolean'
 *            },
 *            'data': {
 *                'type': 'string'
 *            }
 *         }
 */
router.get("/appearance_settings", middleware.user_bearer_authentication, targetAppearanceSettingsController.get_tools_appearance_settings)

/**
 * @swagger
 * /api/tools/target/appearance_settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: []
 *     description: get main settings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *           'general_settings': {
 *             'type': 'object',
 *             'properties': {
 *                'measuring_the_content_of_the_tool_and_the_box': {
 *                  'type': 'boolean',
 *                }
 *             },
 *           },
 *           'target_background_box': {
 *             'type': 'object',
 *             'properties': {
 *                'show_background': {
 *                  'type': 'boolean',
 *                  'default': true
 *                },
 *                'background_color': {
 *                  'type': 'string',
 *                  'default': '#f9f9f9',
 *                },
 *                'show_shadow': {
 *                  'type': 'boolean',
 *                },
 *                'radius': {
 *                  'type': 'number',
 *                },
 *             }
 *           },
 *           'target_title': {
 *             'type': 'object',
 *             'properties': {
 *                'show_target_title': {
 *                  'type': 'boolean',
 *                },
 *                'text_color': {
 *                  'type': 'string',
 *                  'default': '#f5f5f5',
 *                },
 *                'title_text_format': {
 *                  'type': 'string',
 *                },
 *                'font_size': {
 *                  'type': 'number',
 *                },
 *                'show_text_shadow': {
 *                  'type': 'boolean',
 *                },
 *             },
 *           },
 *           'target_progress_bar': {
 *             'type': 'object',
 *             'properties': {
 *                'show_progress_bar': {
 *                  'type': 'boolean',
 *                },
 *                'bar_color': {
 *                  'type': 'string',
 *                  'default': '#9ffff9',
 *                },
 *                'bar_background_color': {
 *                  'type': 'string',
 *                  'default': '#99bb99',
 *                },
 *                'bar_text_color': {
 *                  'type': 'string',
 *                  'default': '#99bb99',
 *                },
 *                'font_size': {
 *                  'type': 'number',
 *                },
 *                'radius_of_holder_bar': {
 *                  'type': 'number',
 *                },
 *                'radius_of_inside_bar': {
 *                  'type': 'number',
 *                },
 *                'bar_height': {
 *                  'type': 'number',
 *                },
 *                'min_width_of_process_bar': {
 *                  'type': 'number',
 *                },
 *                'stroke_color': {
 *                  'type': 'string',
 *                  'default': '#99bb99',
 *                },
 *                'to_advance_the_bar': {
 *                  'type': 'string',
 *                },
 *             },
 *           },
 *           'target_detail': {
 *             'type': 'object',
 *             'properties': {
 *                'show_target_detail': {
 *                  'type': 'boolean',
 *                },
 *                'text_color': {
 *                  'type': 'string',
 *                  'default': '#99bb99',
 *                },
 *                'text_format_detail': {
 *                  'type': 'string',
 *                },
 *                'font_size': {
 *                  'type': 'number',
 *                  'default': 26,
 *                },
 *             },
 *           },
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *            'success': {
 *               'type': 'boolean'
 *            },
 *            'data': {
 *                'type': 'string'
 *            }
 *         }
 */
router.post("/appearance_settings", middleware.user_bearer_authentication, targetAppearanceSettingsController.update_tools_appearance_settings)

export default router