import express, { Router } from "express";
const router: Router = express.Router();
import * as toolsUploaderController from "./../../controllers/tools/tools.controllers"
import * as middleware from "./../../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/tools/uploader:
 *   post:
 *     tags: [Tools]
 *     description: upload file's on different tools section
 *     security:
 *      - bearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: file
 *         description: file.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: file_type
 *         description: file.
 *         in: formData
 *         required: true
 *         type: string
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
router.post("/uploader",
    middleware.user_bearer_authentication,
    toolsUploaderController.uploader
)

export default router;