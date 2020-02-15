const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema for todo
const BoardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Board title is required']
  }
})

//create model for todo
const Todo = mongoose.model('board', BoardSchema);

module.exports = Todo;