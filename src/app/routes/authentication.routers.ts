import express, { Router } from "express";
const router: Router = express.Router();

// middlewares
import * as middlewares from "../middleware/users/authentication.middleware";

// endpoints
import * as usersEndpoints from "../controllers/users/users.controller"
import * as authenticationEndpoints from "../controllers/authentications/authentications.controller"

/**
 * @swagger
 * /api/authentication/register/verify:
 *  post:
 *      tags: [Authentication]
 *      description: register a new user
 *      produces:
 *          - application/json
 *      parameters:
 *        - name: countinue_token
 *          in: query
 *          schema:
 *            type: string
 *          description: token to continue the registration
 *        - name: password
 *          in: formData
 *          type: string
 *          description: users password
 *        - name: confirm_password
 *          in: formData
 *          type: string
 *          description: users password
 *        - name: name
 *          in: formData
 *          type: string
 *          description: users name
 *        - name: phoneNumber
 *          in: formData
 *          type: string
 *          description: users phone number
 *        - name: displayName
 *          in: formData
 *          type: string
 *          description: users display name
 *        - name: username
 *          in: formData
 *          type: string
 *        - name: has_accepted_terms
 *          in: formData
 *          type: boolean
 *          description: users username
 *      responses:
 *          200:
 *             description: Successful operation
 *             schema:
 *             type: object
 *             properties: {
 *                  'success': {
 *                      'type': 'boolean'
 *                  },
 *                   'data': {
 *                          'type': 'string'
 *                      }
 *                  }
 * 
 *          
 */
router.post('/register/verify',
    middlewares.countinue_token_with_email,
    authenticationEndpoints.register
);

/**
* @swagger
* /api/authentication/register/sendEmail:
*   post:
*     tags: [Authentication]
*     description: send an email to the user for validating his email
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: user email.
*         in: formData
*         required: true
*         type: string
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
router.post('/register/sendEmail', authenticationEndpoints.register_email);

/**
* @swagger
* /api/authentication/login/email:
*   post:
*     tags: [Authentication]
*     description: login with email
*     produces:
*       - application/json
*     parameters:
*       - name: email
*         description: user's email.
*         in: formData
*         default: 'imanesche@gmail.com'
*         required: true
*         type: string
*       - name: password
*         description: user's password.
*         in: formData
*         default: '12345678'
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
router.post('/login/email', authenticationEndpoints.login_email)

/**
* google register

*/
/**
* @swagger
* /api/authentication/register/google/url:
*  get:
*    tags: [Authentication]
*    description: get register email of the user with google (link)
*    produces:
*     - application/json
*    responses:
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
*    
*      
*/
router.get('/register/google/url',
    authenticationEndpoints.register_google_url
)

/**
* @swagger
* /api/authentication/login/google/url:
*  get:
*    tags: [Authentication]
*    description: login email of the user with google (link)
*    produces:
*     - application/json
*    responses:
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
*    
*      
*/
router.get('/login/google/url', authenticationEndpoints.login_google_url)

// CALLBACKS
router.get('/register/google/redirect', authenticationEndpoints.register_redirect_google)
router.get('/login/google/redirect', authenticationEndpoints.login_redirect_google)
/**
* google register

*/

/**
 * @swagger
 * /api/authentication/register/twitch/url:
 *   get:
 *     tags: [Authentication]
 *     description: get register with twitch link 
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
router.get('/register/twitch/url', authenticationEndpoints.register_twitch_url)

/**
* @swagger
* /api/authentication/login/twitch/url:
*   get:
*     tags: [Authentication]
*     description: get login with twitch link
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
router.get('/login/twitch/url', authenticationEndpoints.login_twitch_url)

router.get('/register/twitch/redirect', authenticationEndpoints.register_twitch_redirect)

router.get('/login/twitch/redirect', authenticationEndpoints.login_twitch_redirect)


export default router;