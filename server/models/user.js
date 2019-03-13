const User = require('../schema/user');

const getUserByName = async (name) => {
  return await User.findOne(name);
}

const addUser = async (content) => {
  return await User.create(content);
}

module.exports = {
  getUserByName,
  addUser
}