import express, { Router } from "express";
const router: Router = express.Router();
import * as endpoints from "../controllers/emojis/emojis.controller";
import * as middleware from "../middleware/users/authentication.middleware";


/**
 * @swagger
 * /api/emojis/create:
 *   post:
 *     description: create a emoji.
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []
 *     tags: [Emojis]
 *     parameters:
 *       - name: emoji
 *         description: emoji file.
 *         in: formData
 *         required: true
 *         type: file
 *       - name: title
 *         description: emoji title.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: emoji price.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: animationStyle
 *         description: style of animation.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: animationSpeed
 *         description: speed of animation.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: animationCount
 *         description: count of animation.
 *         in: formData
 *         required: true
 *         type: string
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
router.post("/create",
    middleware.user_bearer_authentication,
    endpoints.create_emoji
)

/**
 * @swagger
 * /api/emojis/:
 *   get:
 *     description: get emojis.
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []
 *     tags: [Emojis]
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
router.get("/",
    middleware.user_bearer_authentication,
    endpoints.get_emojis
)

/**
 * @swagger
 * /api/emojis/update:
 *   post:
 *     description: update a emoji.
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []
 *     tags: [Emojis]
 *     parameters:
 *       - name: id
 *         description: emoji id.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: emoji
 *         description: emoji file.
 *         in: formData
 *         required: false
 *         type: file
 *       - name: title
 *         description: emoji title.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: price
 *         description: emoji price.
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: animationStyle
 *         description: style of animation.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: animationSpeed
 *         description: speed of animation.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: animationCount
 *         description: count of animation.
 *         in: formData
 *         required: true
 *         type: string
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
router.post("/update",
    middleware.user_bearer_authentication,
    endpoints.update_emoji
)

/**
 * @swagger
 * /api/emojis/delete:
 *   delete:
 *     description: delete a emoji.
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - name: id
 *         description: emoji id.
 *         in: formData
 *         required: true
 *         type: string
 *     tags: [Emojis]
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
router.delete("/delete",
    middleware.user_bearer_authentication,
    endpoints.delete_emoji
)

export default router