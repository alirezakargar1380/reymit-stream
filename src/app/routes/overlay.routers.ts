import express, { Router } from "express";
const router: Router = express.Router();
import * as alertController from "../controllers/alerts/alerts.controller"
import * as overlayController from "./../controllers/overlay/overlay.controllers"

/**
 * @swagger
 * /api/overlay:
 *   get:
 *     tags: [Overlay]
 *     description: get overlay view
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         in: query
 *         description: key of the link
 *         required: true
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
router.get("/", overlayController.get_overlay)

export default router