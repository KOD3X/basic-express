const validator = require('../helpers/input-validator');
const encrypter = require('../helpers/encrypter');
const user_service = require('../services/user.service');
const email_service = require('../services/email.service');

function createUser(req, res, next) {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    // Check input data
    validator.validateEmail(name);
    validator.validateEmail(email);
    validator.validatepass(pass);

    const encryptedPass = encrypter.cryptPassword(pass);

    const user = user_service.createUser(name, email, encryptedPass);

    email_service.sendEmail(
      'Ulpiano',
      email,
      'Welcome',
      `Hi ${name}! welcome to the team!`
    );

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

function updateUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const name = req.body.name;
    const email = req.body.email;
    const pass = req.body.password;

    // Check input data
    validator.validateEmail(name);
    validator.validateEmail(email);
    validator.validatepass(pass);

    const encryptedPass = encrypter.cryptPassword(pass);

    const user = user_service.updateUser(userId, name, email, encryptedPass);

    email_service.sendEmail(
      'Ulpiano',
      email,
      'User updated',
      `Hi ${name}! Your account was updated`
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

function getUser(req, res, next) {
  try {
    const userId = req.params.userId;

    const user = user_service.retrieveUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

function getAllUsers(req, res, next) {
  try {
    const users = user_service.retrieveAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;
    user_service.deleteUser(userId);
    res.status(200).json({
      Message: 'The user has been removed',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
};
