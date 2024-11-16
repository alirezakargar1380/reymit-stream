import express, { Router } from "express";
const router: Router = express.Router();
import * as usersEndpoints from "../controllers/users/users.controller"
import * as middleware from "../middleware/users/authentication.middleware";

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: get user profile details
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
router.get('/profile',
    middleware.user_bearer_authentication,
    usersEndpoints.profile
)

/**
 * @swagger
 * /api/users/profile/misc/edit:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: get user avatar
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: displayName
 *         description: users new displayName.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: gatewayAddress
 *         description: newPassword1.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: isGatewayActive
 *         description: gateway status.
 *         in: formData
 *         required: true
 *         type: boolean
 *     responses:
 *       200:
 *         description: response example
 *         schema:
 *           type: object
 *           properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                  'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 */
router.post('/profile/misc/edit',
    middleware.user_bearer_authentication,
    usersEndpoints.edit_info
)

/**
 * @swagger
 * /api/users/profile/edit/password:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: change user password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: currentPassword
 *         description: currentPassword.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newPassword1
 *         description: newPassword1.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newPassword2
 *         description: newPassword2.
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
router.post('/profile/edit/password',
    middleware.user_bearer_authentication,
    usersEndpoints.edit_password
)

/**
 * @swagger
 * /api/users/profile/edit/phone_number:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: edit user's phone number
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: phoneNumber
 *         description: new user's email.
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
router.post('/profile/edit/phone_number',
    middleware.user_bearer_authentication,
    usersEndpoints.edit_phone_number
)

/**
 * @swagger
 * /api/users/profile/edit/phone_number/verify:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: verify user's changed phone number
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: phoneNumber
 *         description: user's email.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: code
 *         description: c0de.
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
router.post('/profile/edit/phone_number/verify',
    middleware.user_bearer_authentication,
    usersEndpoints.verify_edit_phone_number
)

/**
 * @swagger
 * /api/users/profile/edit/avatar:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: edit user avatar
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: image
 *         description: user new image.
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
router.post('/profile/edit/avatar',
    middleware.user_bearer_authentication,
    usersEndpoints.update_avatar
)

/**
 * @swagger
 * /api/users/profile/edit/avatar/delete:
 *   delete:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: delete user avatar
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
router.delete('/profile/edit/avatar/delete',
    middleware.user_bearer_authentication,
    usersEndpoints.delete_avatar
)

/**
 * @swagger
 * /api/users/profile/edit/email:
 *   post:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: change email address of the user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: user's email.
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
router.post('/profile/edit/email',
    middleware.user_bearer_authentication,
    usersEndpoints.edit_email
)

/**
 * @swagger
 * /api/users/profile/edit/email/verify:
 *   get:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: verify users changed email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: user's email.
 *         in: query
 *         required: true
 *         type: string
 *       - name: code
 *         description: c0de.
 *         in: query
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
router.get('/profile/edit/email/verify',
    middleware.user_bearer_authentication,
    usersEndpoints.verify_edit_email
)

/**
 * @swagger
 * /api/users/profile/subscription:
 *   get:
 *     tags: [Profile]
 *     security:
 *      - bearerAuth: []
 *     description: get user subscription details
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
router.get('/profile/subscription',
    middleware.user_bearer_authentication,
    usersEndpoints.subscriptionDetail
)

export default router;