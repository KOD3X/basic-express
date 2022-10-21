/**
 * To generate a secret you can use this line on a Node REPL:
 *     require('crypto').randomBytes(64).toString('hex');
 */

const jwt = require('jsonwebtoken');

function generateToken(user) {
  const payload = {
    userId: user.id,
  };

  return jwt.sign(payload, process.env.JWT_TOKEN_SECRET, { expiresIn: '1800s' });
}

function checkToken(req, res, next) {
  const token = req.headers['authorization'];

  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, payload) => {
    if (error) {
      // token is invalid
      error.status = 401;
      return next(error);
    }

    if (req.params.userId != payload.userId) {
      // URI user is not token user
      const error = new Error("You don't have permission");
      error.status = 403;
      return next(error);
    }

    req.payload = payload;

    next();
  });
}

module.exports = {
  generateToken,
  checkToken,
};
