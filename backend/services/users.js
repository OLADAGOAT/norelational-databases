
const User = require("../models/user");

// Return all users
async function findAll() {
  return User.find();
}

// Find a user by ID
async function findById(id) {
  return User.findById(id);
}

// Create a new user
async function create(body) {
  return User.create(body);
}

// Update a user by ID
async function update(id, body) {
  return User.findByIdAndUpdate(id, body, { new: true });
}

// Delete a user by ID
async function remove(id) {
  return User.findByIdAndDelete(id);
}

module.exports = { findAll, findById, create, update, remove };
