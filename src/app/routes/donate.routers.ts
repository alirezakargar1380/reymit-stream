import express, { Router } from "express";
const router: Router = express.Router();
import * as endpoints from "../controllers/donates/donates.controller";
import * as middleware from "../middleware/users/authentication.middleware";


/**
 * @swagger
 * /api/donates/:
 *   get:
 *     description: donates.
 *     produces:
 *       - application/json
 *     security:
 *      - bearerAuth: []
 *     tags: [Donates]
 *     parameters:
 *      - name: Page
 *        in: query
 *        description: page number
 *        required: true
 *        type: string
 *      - name: displayName
 *        in: query
 *        description: display name of donater to filter
 *        required: false
 *        type: string
 *      - name: paymentMethod
 *        in: query
 *        description: payment method
 *        required: false
 *        type: string
 *      - name: dateFrom
 *        in: query
 *        description: date starts from
 *        required: false
 *        type: string
 *      - name: dateTo
 *        in: query
 *        description: date ends to
 *        required: false
 *        type: string
 *      - name: amountFrom
 *        in: query
 *        description: amount starts from
 *        required: false
 *        type: string
 *      - name: amountTo
 *        in: query
 *        description: amount ends to
 *        required: false
 *        type: string
 *      - name: publishName
 *        in: query
 *        description: published name
 *        required: false
 *        type: boolean
 *      - name: publishDesc
 *        in: query
 *        description: published description
 *        required: false
 *        type: boolean
 *      - name: publishNameInDonatorList
 *        in: query
 *        description: published name in donator list
 *        required: false
 *        type: boolean
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
    endpoints.get_donates
)

export default router