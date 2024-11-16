import http from "http";
import express from "express";
import log from "./app/utils/log.utility"
require('dotenv').config  ({ path: '.env' })
import { Loaders } from './app/loaders'
import { Socket } from "socket.io";
import { socketEndpoint } from "./app/controllers/socket/socket.controller"
import { userRepository } from "./app/shared/config";
import { IUser } from "./app/shared/interfaces/user.interface";
import * as premiumService from "./app/services/premium_check/premium_check"
import JWT from "./app/utils/jwt.utils"

const startServer = () => {
  const app: express.Express = express()
  Loaders(app)

  const server = http.createServer(app);
  let io = require('socket.io')(server, {
    allowEIO3: true,
    cors: {
      origin: '*',
      credentials: true
    }
  });

  io.on('connection', async (socket: Socket) => {
    try {
      console.log("new user was connected")
      // socket.join("test")

      if (!('key' in socket.handshake.query)) return socket.disconnect()
      let key: any = socket.handshake.query.key

      const decoded_token: any = JWT.verify_token(key)
      log.info(decoded_token.user_id)
      socket.join(decoded_token.user_id as string)
      const user: IUser | null = await userRepository.findById(decoded_token.user_id)
      if (!user) return socket.disconnect()
      if (!user.active) return socket.disconnect()
      // await premiumService.check(user._id)

      await socketEndpoint(socket, user)

    } catch (e: any) {
      console.log(e)
      socket.disconnect()
      if (e.extensions) {
      }
    }
    // check if user link is not valid disconnect 
    // socket.disconnect()
    // return

    // 
    // socket.join("62a3528cdcb8fe24ac015afc")
    // log.info(`a user connected`)
  })

  const port: string = process.env.PORT || '3000'
  server.listen(port, () => {
    log.info(`you app sussfully is run on port: ${port}`)
    log.info(`swagger docs address: ${process.env.MAIN_WEBSITE_URL}/api/docs/`)
  })

  return io
}

export default startServer()

/**
 *    TODO:
 *      - if user was not by any package dont let him to use the alerts section
 *      - tools section validation
 *      - login validation for update settings
 *      - swagger for update settings
 *      - check user subscription
 *      - add socket service for fetch donation to client
 *      - voice and emoji settings not working
 *      - condition
 */