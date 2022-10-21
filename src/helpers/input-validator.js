exports.validateEmail = function (email) {
  if (!email) {
    const error = new Error("Email can't be empty");
    error.status = 400;
    throw error;
  }
};

exports.validateName = function (name) {
  if (!name) {
    const error = new Error("Name can't be empty");
    error.status = 400;
    throw error;
  }
};

exports.validatepass = function (pass) {
  if (!pass) {
    const error = new Error("password can't be empty");
    error.status = 400;
    throw error;
  }
};
