'use strict';

const logger = require('../helpers/logger');

function sendEmail(from, to, subject, message) {
  logger.debug(`Sending email from ${from} to ${to} with ${subject}`);
  logger.debug(`Message:  ${message}`);
}

module.exports = {
  sendEmail,
};
