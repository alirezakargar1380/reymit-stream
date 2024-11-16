import { Router } from "express";
const router: Router = Router();
import * as conditionsControllers from "./../../../../../controllers/tools/new_event_alert/new_donation_alert/conditions/conditions.controllers";
import * as middleware from "./../../../../../middleware/users/authentication.middleware";

/**
 *   @TODO:
 *      - add user login check
 */

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions/{condition_id}:
 *   get:
 *     tags: [Conditions]
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.get("/conditions/:condition_id", conditionsControllers.get_condition_byId)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions:
 *   get:
 *     tags: [Conditions]
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.get("/conditions", conditionsControllers.get_conditions_byUserId)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions/{condition_id}:
 *   delete:
 *     tags: [Conditions]
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.delete("/conditions/:condition_id", conditionsControllers.delete_conditions)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions:
 *   put:
 *     tags: [Conditions]
 *     description: send an email to the user for validating his email
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.put("/conditions", conditionsControllers.update_conditions)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions:
 *   post:
 *     tags: [Conditions]
 *     description: add condition for new donation alert
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: data
 *         description: condition insert data
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *           'type_of_conditions': {
 *              'type': 'string',
 *              'default': 'amount_of_support_greater_than_or_equal_to_an_amount'
 *           },
 *           'amount': {
 *              'type': 'number',
 *              'default': 'amount_of_support_greater_than_or_equal_to_an_amount'
 *           },
 *           'general_settings': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'new_donate_alert_sound': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               },   
 *                               'file_selection_method': {
 *                                  'type': 'string'
 *                               },   
 *                               'link_or_name_of_file': {
 *                                  'type': 'string'
 *                               },   
 *                               'sound_volume': {
 *                                  'type': 'number'
 *                               },   
 *                           }
 *                      },     
 *                      'timing': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string'
 *                               },   
 *                               'alert_show_time': {
 *                                  'type': 'number'
 *                               },   
 *                               'alert_delay_time': {
 *                                  'type': 'number'
 *                               },   
 *                               'show_delay_sponser_details': {
 *                                  'type': 'number'
 *                               },   
 *                           }
 *                      },     
 *                 }
 *           },
 *           'appearance_settings': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'appearance_profile_of_the_sponsor_profile_box': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               },   
 *                               'file_selection_method': {
 *                                  'type': 'string',
 *                                  'default': 'without_change'
 *                               },   
 *                           }
 *                      }   
 *                 }
 *           },
 *           'send_emoji': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'general_settings': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      }   
 *                 }
 *           },
 *           'send_voice': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'general_settings': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      }   
 *                 }
 *           },
 *           'video_content_settings_tool': {
 *                 'type': 'object',
 *                 'properties': {
 *                      'background_content_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                      'content_top_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                      'content_below_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                      'content_right_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                      'content_left_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                      'content_bottom_sponsor_profile': {
 *                           'type': 'object',
 *                           'properties': {
 *                               'change_status_of_this_section_for_this_condition': {
 *                                  'type': 'string',
 *                                  'default': 'without_change',
 *                               }, 
 *                           }
 *                      },   
 *                 }
 *           },
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/conditions",
    middleware.user_bearer_authentication,
    conditionsControllers.add_condition
)

/**
 * @swagger
 * /api/tools/new_event_alert/new_support_alert/conditions/uploader:
 *   post:
 *     tags: [Conditions]
 *     description: upload file for condition section
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: file.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: response example
 *         type: string
 */
router.post("/conditions/uploader",
    middleware.user_bearer_authentication,
    conditionsControllers.uploader
)

export default router