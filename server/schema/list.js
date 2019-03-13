const mongoose = require('../db');
const Schema = mongoose.Schema;

var ListSchema = new Schema({
  content: String,
  complete: Boolean,
  name: String
})

module.exports = mongoose.model('list', ListSchema, 'todolist');