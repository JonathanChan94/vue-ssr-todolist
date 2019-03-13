const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/todolist';

mongoose.connect(DB_URL);

mongoose.connection.on('connected', () => {
  console.log('DB connected');
})

mongoose.connection.on('error', () => {
  console.log('DB connect error');
})

mongoose.connection.on('disconnected', () => {
  console.log('DB disconnected');
})

module.exports = mongoose;
