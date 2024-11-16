const _ = require('lodash');
import log from './log.utility';

class Exception extends Error {
  public isThrow: boolean;
  public extensions: any;
  constructor(error: any, isThrow: boolean) {
    super(error);
    this.extensions = error;
    this.isThrow = isThrow;
  }

  static setError(error: any, isThrow: boolean) {
    try {
      if (!error.extensions && _.isObject(error)) {
        return new Exception(error, isThrow);
      }

      if (_.isString(error)) {
        return new Exception(error, isThrow);
      }

      return error;
    } catch (err: any) {
      log.error(`custom error faild, ${err.message}`);
      throw new Error(err.message);
    }
  }
}

export default Exception;