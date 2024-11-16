import express, { Router } from "express";
const router: Router = express.Router();
import * as gateway_endpoints from "../controllers/gateway/gateway_endpoints";
import * as gateway_main_settings_endpoints from "../controllers/gateway_settings/main_settings.controller";
import * as appearance_settings_endpoints from "../controllers/gateway_settings/appearance_settings.controller";
import * as middleware from "./../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/gateway/settings/main:
 *   post:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: update gateway main settings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'minimum_amount_of_support': {
 *               'type': 'integer',
 *             },
 *            'maximux_amount_of_support': {
 *               'type': 'integer',
 *             },
 *            'currency_support': {
 *               'type': 'boolean',
 *             },
 *            'deposit_support_to_id': {
 *               'type': 'string',
 *             },
 *            'need_confirm_the_phone_number_before_payment': {
 *               'type': 'boolean',
 *             },
 *            'filter_unauthorized_words': {
 *               'type': 'boolean',
 *             },
 *            'gateways': {
 *               'type': 'object',
 *               'properties': {
 * 
 *                   'zarinpal': {
 *                      'type': 'object',
 *                      'properties': {
 *                         'code': {
 *                            'type': 'string',
 *                         },
 *                         'is_default': {
 *                            'type': 'boolean',
 *                         }
 *                      }
 *                   },
 *                   'idp': {
 *                      'type': 'object',
 *                      'properties': {
 *                         'code': {
 *                            'type': 'string',
 *                         },
 *                         'is_default': {
 *                            'type': 'boolean',
 *                         }
 *                      }
 *                   },
 *                   'pir': {
 *                      'type': 'object',
 *                      'properties': {
 *                         'code': {
 *                            'type': 'string',
 *                         },
 *                         'is_default': {
 *                            'type': 'boolean',
 *                         }
 *                      }
 *                   },
 *                   'pping': {
 *                      'type': 'object',
 *                      'properties': {
 *                         'code': {
 *                            'type': 'string',
 *                         },
 *                         'is_default': {
 *                            'type': 'boolean',
 *                         }
 *                      }
 *                   },
 * 
 *                },
 *            },
 *            'reqirement_data': {
 *               'type': 'object',
 *               'properties': {
 *                  'name': {
 *                    'type': 'boolean',
 *                  },
 *                  'details': {
 *                    'type': 'boolean',
 *                  },
 *                  'support_list': {
 *                    'type': 'boolean',
 *                  },
 *                  'phone_number': {
 *                    'type': 'boolean',
 *                  },
 *                  'email': {
 *                    'type': 'boolean',
 *                  },
 *                  'terms_and_conditions': {
 *                    'type': 'boolean',
 *                  },
 *                  'gift': {
 *                    'type': 'boolean',
 *                  },
 *                  'show_target': {
 *                    'type': 'boolean',
 *                  },
 *               }
 *            }
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.post("/settings/main",
    middleware.user_bearer_authentication,
    gateway_main_settings_endpoints.update_main_settings
)

/**
 * @swagger
 * /api/gateway/settings/main:
 *   get:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: get user gateway main settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.get("/settings/main",
    middleware.user_bearer_authentication,
    gateway_main_settings_endpoints.get_main_settings
)

/**
 * @swagger
 * /api/gateway/settings/main/profile/update:
 *   post:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: update user gateway profile
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: user new profile pic.
 *         in: formData
 *         required: true
 *         type: file
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.post("/settings/main/profile/update",
    middleware.user_bearer_authentication,
    gateway_main_settings_endpoints.update_gateway_profile,
)

/**
 * @swagger
 * /api/gateway/settings/main/profile/delete:
 *   delete:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: delete user gateway profile
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.delete("/settings/main/profile/delete",
    middleware.user_bearer_authentication,
    gateway_main_settings_endpoints.delete_gateway_logo,
)

/**
 * @swagger
 * /api/gateway/settings/appearance:
 *   post:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: update user gateway appearance settings
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reqirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'background_pattern_image_link': {
 *               'type': 'string',
 *            },
 *            'background_image_link': {
 *               'type': 'string',
 *            },
 *            'first_color': {
 *               'type': 'string',
 *            },
 *            'second_color': {
 *               'type': 'string',
 *            },
 *            'twitch_account_username': {
 *               'type': 'string',
 *            },
 *            'show_link_in_stram': {
 *               'type': 'boolean',
 *            },
 *            'social_media_inside_gateway_link': {
 *               'type': 'object',
 *               'properties': {
 *                   'telegram': {
 *                      'type': 'string',
 *                   },
 *                   'youtube': {
 *                      'type': 'string',
 *                   },
 *                   'facebook': {
 *                      'type': 'string',
 *                   },
 *                   'instagram': {
 *                      'type': 'string',
 *                   },
 *                   'twitch': {
 *                      'type': 'string',
 *                   },
 *                   'discord': {
 *                      'type': 'string',
 *                   },
 *                   'aparat': {
 *                      'type': 'string',
 *                   },
 *               }
 *            },
 *         }
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *         type: object
 *         properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.post("/settings/appearance",
    middleware.user_bearer_authentication,
    appearance_settings_endpoints.update_appearance_settings,
)

/**
 * @swagger
 * /api/gateway/settings/appearance:
 *   get:
 *     tags: [Gateway Settings]
 *     security:
 *      - bearerAuth: [] 
 *     description: get user gateway appearance settings
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.get("/settings/appearance",
    middleware.user_bearer_authentication,
    appearance_settings_endpoints.get_appearance_settings,
)

/**
 * @swagger
 * /api/gateway/{gatewayAddress}:
 *   get:
 *     tags: [Gateway]
 *     security:
 *      - bearerAuth: []
 *     description: get user gateway appearance settings
 *     parameters:
 *       - name: gatewayAddress
 *         description: gateway address.
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.get("/:gatewayAddress",
    gateway_endpoints.get_gateway_details_by_address,
)

/**
 * @swagger
 * /api/gateway/{gatewayAddress}/donate:
 *   post:
 *     tags: [Gateway]
 *     description: donate
 *     parameters:
 *       - name: gatewayAddress
 *         description: gateway address.
 *         in: path
 *         required: true
 *         type: string
 *       - name: requirements
 *         description: body data.
 *         in: body
 *         required: true
 *         type: object
 *         properties: {
 *            'amount_irr': {
 *               'type': 'integer',
 *               'default': 10000    
 *            },
 *            'displayName': {
 *               'type': 'string',
 *               'default': 'oscol'
 *            },
 *            'email': {
 *               'type': 'string',
 *               'default': 'oscol@gmail.com'
 *            },
 *            'phoneNumber': {
 *               'type': 'string',
 *               'default': '09176489525'
 *            },
 *            'desc': {
 *               'type': 'string',
 *            },
 *            'publishName': {
 *               'type': 'boolean',
 *            },
 *            'publishDesc': {
 *               'type': 'boolean',
 *            },
 *            'publishNameInDonatorList': {
 *               'type': 'boolean',
 *            },
 *            'has_accepted_terms': {
 *               'type': 'boolean',
 *               'default': true
 *            },
 *         }
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.post("/:gatewayAddress/donate",
    gateway_endpoints.donate,
)

router.get("/:gatewayAddress/donate/verify/:paymentMethod",
    gateway_endpoints.verify_donate,
)

router.post("/:gatewayAddress/donate/verify/:paymentMethod",
    gateway_endpoints.verify_donate,
)

export default router