const log = require('fancy-log');
const chalk = require('chalk');

class Log {
  constructor() {
    this.console = global.console.log;
  }

  console(message: string) {
    this.console(message);
  }

  normal(message: string) {
    log(message);
  }

  error(message: string) {
    const { redBright, black } = chalk;
    log(black.bgRed(' Error '), redBright(message));
  }

  warning(message: string) {
    const { yellow, black } = chalk;
    log(black.bgYellow(' Warning '), yellow(message));
  }

  info(message: string) {
    const { blueBright, black } = chalk;
    log(black.bgBlue(' Info '), blueBright(message));
  }

  success(message: string) {
    const { greenBright, black } = chalk;
    log(black.bgGreen(' Success '), greenBright(message));
  }
}

export default new Log();