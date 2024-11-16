import express, { Router } from "express";
const router: Router = express.Router();
import * as packagesEndpoints from "../controllers/packages/packages.controller"
import auth from '../middleware/auth'
import * as security_middlewares from './../middleware/users/authentication.middleware'

/**
 * @swagger
 * /api/packages/:
 *   get:
 *     tags: [Packages]
 *     description: get all available packages
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
router.get('/', packagesEndpoints.get_packages);

/**
 * @swagger
 * /api/packages/{code}/activate:
 *   post:
 *     tags: [Packages]
 *     security:
 *      - bearerAuth: [] 
 *     description: active package by code
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: code
 *        in: path
 *        description: package code
 *        required: true
 *        type: string
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
router.post('/:code/activate',
    security_middlewares.user_bearer_authentication,
    packagesEndpoints.active_code_package
);

/**
 * @swagger
 * /api/packages/history:
 *   get:
 *     tags: [Packages]
 *     security:
 *      - bearerAuth: [] 
 *     description: active package by code
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
router.get('/history',
    security_middlewares.user_bearer_authentication,
    packagesEndpoints.get_package_history
);

/**
 * @swagger
 * /api/packages/activate/trial:
 *   post:
 *     tags: [Packages]
 *     security:
 *      - bearerAuth: [] 
 *     description: active trial package
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
router.post('/activate/trial',
    // auth, 
    security_middlewares.user_bearer_authentication,
    packagesEndpoints.active_trial_package
);

/**
 * @swagger
 * /api/packages/{package}/buy:
 *   post:
 *     tags: [Packages]
 *     security:
 *      - bearerAuth: [] 
 *     description: buy a package
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: package
 *        in: path
 *        description: package id
 *        required: true
 *        type: string
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
router.post('/:package/buy',
    security_middlewares.user_bearer_authentication,
    packagesEndpoints.buy_package
);

router.get('/buy/verify', packagesEndpoints.buy_verify);

export default router;