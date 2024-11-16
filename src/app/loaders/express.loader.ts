const cors = require("cors")
import express, {Request, Response} from 'express';
const cookieParser = require('cookie-parser')
const querystring = require('querystring')
const axios = require('axios')
const jwt = require('jsonwebtoken')
import routers from './../routes';
import bodyParser from "body-parser"
import userModel from "../models/user.model"
import packageModel from "../models/package.model"


export default ({app}: { app: express.Application }) => {
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.use(bodyParser.json());
  app.use(cookieParser())
  app.use(cors())
  app.use(express.json())
  app.set('view engine', 'ejs');

  app.use(express.static('public'));
  // app.use('/static', express.static('public'))
  app.use("/api", routers)

  app.get("/", (req: Request, res: Response) => {
    res.send("welcome")
  })
}