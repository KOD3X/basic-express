'use strict';

function sendEmail(from, to, subject, message) {
  console.log(`Sending email from ${from} to ${to} with ${subject}`);
  console.log('Message: ', message);
}

module.exports = {
  sendEmail,
};
