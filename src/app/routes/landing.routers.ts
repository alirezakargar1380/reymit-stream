import express, { Router } from "express";
const router: Router = express.Router();
import * as endpoints from "../controllers/landings/landings.controller";

/**
 * @swagger
 * /api/landings/{category}:
 *   get:
 *     description: landings.
 *     produces:
 *       - application/json
 *     tags: [Landings]
 *     parameters:
 *       - name: category
 *         description: category.
 *         in: path
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
router.get("/:category",
    endpoints.get
)

export default router