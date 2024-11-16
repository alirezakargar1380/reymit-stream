// Packages
import express, { Router } from "express";
const router: Router = express.Router();

// Endpoints
import * as endpoints from "../controllers/forget_password/forget_password.controller";

// Schema
import ForgetPasswordSchema from "./../models/forget_passwod_tokens"
import UserSchema from "./../models/user.model"

// Utils
import JWT from "./../utils/jwt.utils"


router.get("/reset-password/:token", endpoints.get_reset_password);

router.post("/reset-password/:token", endpoints.post_reset_password)

/**
 * @swagger
 * /api/forget_password:
 *   post:
 *     description: this api send a forget password email to user
 *     produces:
 *       - application/json
 *     tags: [Forget Password]
 *     parameters:
 *       - name: email
 *         description: you're current email.
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
router.post("/", endpoints.forget_password)

export default router