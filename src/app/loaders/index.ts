import mongooseLoader from "./mongoose.loader"
import expressLoader from "./express.loader"
import adminLoader from "./admin.loader"
import {Application} from 'express';

export function Loaders(expressApp: Application) {
  try {
    adminLoader({app: expressApp})
    expressLoader({app: expressApp});
    mongooseLoader();
  } catch (e) {
    console.log(e);
    throw e;
  }
}