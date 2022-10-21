'use strict';

const users = [];
let cont = 0;

// Create
function createUser(name, email, pass) {
  const userId = cont;

  const exists = users.filter((user) => email == user.email).length > 0;

  if (exists) {
    const error = new Error('The user already exists');
    error.status = 409;
    throw error;
  }

  // Create user
  const user = {
    id: userId,
    name,
    email,
    pass,
  };

  users.push(user);

  cont++;

  return user;
}

// Retrieve user by id
function retrieveUserById(id) {
  const user = users.filter((user) => id == user.id)[0];

  if (!user) {
    const error = new Error("User doesn't exists");
    error.status = 404;
    throw error;
  }

  return user;
}

// Retrieve user by email
function retrieveUserByEmail(email) {
  const user = users.filter((user) => email == user.email)[0];

  if (!user) {
    const error = new Error("User doesn't exists");
    error.status = 404;
    throw error;
  }

  return user;
}

// Update user
function updateUser(id, name, email, pass) {
  const user = users.filter((user) => id == user.id)[0];

  if (!user) {
    const error = new Error("User doesn't exists");
    error.status = 404;
    throw error;
  }

  const exists = users.filter((user) => email == user.email).length > 0;

  if (exists && user.email != email) {
    const error = new Error('The user already exists');
    error.status = 409;
    throw error;
  }

  // Upadte user
  users[user.id].name = name;
  users[user.id].email = email;
  users[user.id].pass = pass;

  return user;
}

// Delete user
function deleteUser(id) {
  const index = users.findIndex((user) => id == user.id);
  const user = users[index];

  if (!user) {
    const error = new Error("User doesn't exists");
    error.status = 404;
    throw error;
  }

  users.splice(index, 1);

  return user.id;
}

// Retrieve all users
function retrieveAllUsers() {
  return users;
}

module.exports = {
  createUser,
  retrieveUserById,
  retrieveUserByEmail,
  updateUser,
  deleteUser,
  retrieveAllUsers,
};
