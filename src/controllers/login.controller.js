'use strict';

const user_service = require('../services/user.service');
const encrypter = require('../helpers/encrypter');
const validator = require('../helpers/input-validator');
const { generateToken } = require('../middlewares/auth');

function login(req, res, next) {
  try {
    const email = req.body.email;
    const pass = req.body.password;

    // Check input data
    validator.validateEmail(email);
    validator.validatepass(pass);

    const user = user_service.retrieveUserByEmail(email);

    const areTheSame = encrypter.comparePassword(pass, user.pass);

    if (!areTheSame) {
      const error = new Error('Wrong email or password');
      error.status = 401;
      throw error;
    }

    const token = generateToken(user);

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    if (error.status === 404) {
      error = new Error('Wrong email or password');
      error.status = 401;
    }

    next(error);
  }
}

module.exports = {
  login,
};
