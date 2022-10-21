'use strict';

var bcrypt = require('bcrypt');

exports.cryptPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  const encriptedPass = bcrypt.hashSync(password, salt);
  return encriptedPass;
};

exports.comparePassword = function (plainPass, hashword) {
  return bcrypt.compareSync(plainPass, hashword);
};
