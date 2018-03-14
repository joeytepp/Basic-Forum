// Importing the necessary packages
var mongoose = require('Mongoose')
var Schema = mongoose.Schema

var schema = new Schema({
  name: String
})

/*schema.methods.addComment = function(text){
  console.log('Adding '+text+' to comments')
  comments.push(text)
}*/

// Exporting
module.exports = mongoose.model('Test', schema);
