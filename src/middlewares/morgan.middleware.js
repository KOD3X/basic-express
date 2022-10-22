const morgan = require('morgan');
const logger = require('../helpers/logger');

const stream = {
  write: (message) => logger.http(message.trim()),
};

function skip() {
  const currentENV = process.env.NODE_ENV || 'development';
  return currentENV !== 'development';
}

const morganMiddleware = morgan(
  ':remote-addr :user-agent ":method :url HTTP/:http-version" :status - :res[content-length] Bytes :response-time ms',
  { stream, skip }
);

module.exports = morganMiddleware;
