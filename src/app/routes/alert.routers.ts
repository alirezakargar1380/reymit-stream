import express, { Router } from "express";
const router: Router = express.Router();
import * as alertController from "../controllers/alerts/alerts.controller"
import * as middleware from "../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/tools/link:
 *   get:
 *     tags: [Tools]
 *     description: get target
 *     security:
 *      - bearerAuth: []
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
router.get("/link", middleware.user_bearer_authentication, alertController.get_alert_link)

/**
 * @swagger
 * /api/tools/targets/link:
 *   get:
 *     tags: [Tools]
 *     description: get target
 *     security:
 *      - bearerAuth: []
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
router.get("/targets/link", middleware.user_bearer_authentication, alertController.get_target_link)

/**
  * @swagger
  * /api/tools/void_link:
  *   delete:
  *     tags: [Tools]
  *     description: get target
  *     security:
  *       - bearerAuth: []
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
router.delete("/void_link", middleware.user_bearer_authentication, alertController.void_link_key_and_make_new_one)

/**
  * @swagger
  * /api/tools/targets/void_link:
  *   delete:
  *     tags: [Tools]
  *     description: get target
  *     security:
  *       - bearerAuth: []
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
router.delete("/targets/void_link", middleware.user_bearer_authentication, alertController.void_target_Link_key_and_make_new_one)

/**
  * @swagger
  * /api/tools/send_notification:
  *   post:
  *     tags: [Tools]
  *     description: get target
  *     produces:
  *       - application/json
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - name: body
  *         description: body data.
  *         in: body
  *         required: true
  *         type: object
  *         properties: {
  *            'alerts_type': {
  *               'type': 'string',
  *             },
  *            'amount': {
  *               'type': 'integer',
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
router.post("/send_notification", middleware.user_bearer_authentication, alertController.send_notification)

export default router