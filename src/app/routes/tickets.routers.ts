import express, { Router } from "express";
const router: Router = express.Router();
import * as ticketsEndpoints from "../controllers/tickets/tickets.controller";
import * as middlewares from "./../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/tickets/:
 *   get:
 *     tags: [Tickets]
 *     description: get a complete list of tickets
 *     security:
 *       - bearerAuth: [] 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: page_number
 *         in: query
 *         description: page number
 *         required: false
 *       - name: subject
 *         in: query
 *         description: subject of your ticket
 *         required: false
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
router.get('/',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.get_tickets
);

/**
 * @swagger
 * /api/tickets/messages/{ticket_id}:
 *   get:
 *     tags: [Tickets]
 *     description: emty
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: ticket_id
 *         in: path
 *         description: enter your ticket id 
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
router.get('/messages/:ticket_id',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.get_tickets_messages
);

/**
 * @swagger
 * /api/tickets/newTicket:
 *   post:
 *     tags: [Tickets]
 *     description: emty
 *     security:
 *       - bearerAuth: [] 
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: emty
 *         in: formData
 *         required: false
 *         type: file
 *       - name: subject
 *         description: emty
 *         in: formData
 *         required: false
 *         type: string
 *       - name: description
 *         description: emty
 *         in: formData
 *         required: false
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
router.post('/newTicket',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.new_ticket
);

/**
 * @swagger
 * /api/tickets/reply/users:
 *   post:
 *     tags: [Tickets]
 *     description: emty
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: image
 *         description: select your attach file
 *         in: formData
 *         required: false
 *         type: file
 *       - name: ticket_id
 *         description: id of your ticket that you want to reply to it
 *         in: formData
 *         required: false
 *         type: string
 *       - name: description
 *         description: desc of your ticket
 *         in: formData
 *         required: false
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
router.post('/reply/users',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.reply_ticket_by_user
);

/**
 * @swagger
 * /api/tickets/reply/admins:
 *   post:
 *     tags: [Tickets]
 *     description: emty
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: data
 *         description: data
 *         in: body
 *         required: false
 *         type: object
 *         properties: {
 *           'ticket_id': {
 *              'type': 'string'
 *           },
 *           'description': {
 *              'type': 'string'
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
router.post('/reply/admins',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.reply_ticket_by_admin
);

/**
 * @swagger
 * /api/tickets/admins/close_ticket:
 *   post:
 *     tags: [Tickets]
 *     description: emty
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - name: data
 *         description: data
 *         in: body
 *         required: false
 *         type: object
 *         properties: {
 *           'ticket_id': {
 *              'type': 'string'
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
router.post('/admins/close_ticket',
    middlewares.user_bearer_authentication,
    ticketsEndpoints.close_ticket
);

export default router;
