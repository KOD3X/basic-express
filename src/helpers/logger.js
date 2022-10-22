const { createLogger, transports, format, addColors } = require('winston');

const getLogLevel = () => {
  const currentENV = process.env.NODE_ENV || 'development';
  const isDevelopment = currentENV === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const customConfig = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
  },
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.colorize({ all: true }),
    format.printf((info) => `${info.timestamp} - ${info.level}: ${info.message}`)
  ),
  transports: [
    // All to console
    new transports.Console(),
    // All to file
    new transports.File({ filename: 'logs/all.log' }),
    // Errors to file
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
};

addColors(customConfig.colors);

const logger = createLogger({
  level: getLogLevel(),
  levels: customConfig.levels,
  format: customConfig.format,
  transports: customConfig.transports,
});

module.exports = logger;
