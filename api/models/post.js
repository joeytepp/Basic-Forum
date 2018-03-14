// Importing the necessary packages
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  comments: {
    type: [
      {
        name: String,
        message: String
      }
    ],
    required: true
  }
})

// Exporting
module.exports = mongoose.model('Post', schema);
