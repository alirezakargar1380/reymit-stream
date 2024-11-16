import { Router } from "express";
const router: Router = Router();
// CONTROLLER
import * as videoContentSettingsToolControllers from "../../../../controllers/tools/new_event_alert/new_donation_alert/video_content_settings_tool.controller";
import * as middleware from "./../../../../middleware/users/authentication.middleware";

/**
 *   @TODO:
 *      - add user login check
 */

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/video_content_settings:
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
router.get("/video_content_settings",
    middleware.user_bearer_authentication,
    videoContentSettingsToolControllers.get_videoContentSettingsTool
)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/video_content_settings:
 *   post:
 *     tags: [Tools]
 *     security:
 *      - bearerAuth: [] 
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'background_content_sponsor_profile': {
 *               'type': 'object',
 *               'properties': {
 *                      'file_selection_method': {
 *                           'type': 'string',
 *                           'default': 'no_content'
 *                      },      
 *                      'file_type': {
 *                           'type': 'string',
 *                           'default': null
 *                      },      
 *                      'link_or_name_of_file': {
 *                           'type': 'string',
 *                      },      
 *               }
 *            },
 *            'content_below_sponsor_profile': {
 *               'type': 'object',
 *               'properties': {
 *                      'file_selection_method': {
 *                           'type': 'string',
 *                           'default': 'no_content'
 *                      },      
 *                      'file_type': {
 *                           'type': 'string',
 *                           'default': null
 *                      },      
 *                      'link_or_name_of_file': {
 *                           'type': 'string',
 *                      },      
 *               }
 *            },
 *            'other_location_for_placemant_of_content': {
 *               'type': 'object',
 *               'properties': {
 *                  'top_content_sponsor_profile': {
 *                      'type': 'object',
 *                      'properties': {
 *                          'file_selection_method': {
 *                               'type': 'string',
 *                               'default': 'no_content'
 *                          },
 *                          'file_type': {
 *                               'type': 'string',
 *                               'default': null
 *                          },
 *                          'link_or_name_of_file': {
 *                               'type': 'string',
 *                          },
 *                      }
 *                  },
 *                  'right_content_sponsor_profile': {
 *                      'type': 'object',
 *                      'properties': {
 *                          'file_selection_method': {
 *                               'type': 'string',
 *                               'default': 'no_content'
 *                          },
 *                          'file_type': {
 *                               'type': 'string',
 *                               'default': null
 *                          },
 *                          'link_or_name_of_file': {
 *                               'type': 'string',
 *                          },
 *                      }
 *                  },
 *                  'left_content_sponsor_profile': {
 *                      'type': 'object',
 *                      'properties': {
 *                          'file_selection_method': {
 *                               'type': 'string',
 *                               'default': 'no_content'
 *                          },
 *                          'file_type': {
 *                               'type': 'string',
 *                               'default': null
 *                          },
 *                          'link_or_name_of_file': {
 *                               'type': 'string',
 *                          },
 *                      }
 *                  },
 *                  'bottom_content_sponsor_profile': {
 *                      'type': 'object',
 *                      'properties': {
 *                          'file_selection_method': {
 *                               'type': 'string',
 *                               'default': 'no_content'
 *                          },
 *                          'file_type': {
 *                               'type': 'string',
 *                               'default': null
 *                          },
 *                          'link_or_name_of_file': {
 *                               'type': 'string',
 *                          },
 *                      }
 *                  },
 *               } 
 *            }
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/video_content_settings",
    middleware.user_bearer_authentication,
    videoContentSettingsToolControllers.update_videoContentSettingsTool
)

export default router