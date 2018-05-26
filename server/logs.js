import winston from 'winston';

const logger = winston.createLogger({
  /**
  * ============ They are 6 message logs available =============
  * the case on this app will display the following:
  * Production mode: Only log messages w/ the level info or higher.
  * Development mode: Only log messages w/ the level debug or higher.
  * I only want to see error, warn and info in production mode, not verbose, debug or silly.
  * In dev mode, having debug and verbose logs helps a lot with debugging.
  */
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  /**
   * `format` option makes it possible to choose the format of my output.
   * winston.format.simple() will give me this format => ${info.level}: ${info.message}
   * JSON.stringify({ ... rest})
   */
  format: winston.format.simple(),
  /**
   * `transports` option makes it possible to send/save logs to a file of my choice.
   * However, I'm not going to save those messages.
   * Thus, winston.transports.Console() will only display those logs in the console.
   */
  transports: [new winston.transports.Console()],
});

export default logger;

/**
 * 6 Levels of log messages -  https://github.com/winstonjs/winston#using-logging-levels
 * {
 * error: 0,
 * warn:1,
 * info:2,
 * verbose: 3,
 * debug:4,
 * silly:5
 * }
 */

 /**
  * Replace console.log() for the following actions:
  * For debugging, use logger.debug()
  * For errors, use logger.error()
  */
