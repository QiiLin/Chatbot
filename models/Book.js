var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
  timestamp: String,
  question : String,
  answer : String
    }, {collection : 'botdata'});
  module.exports = mongoose.model('botdata', BookSchema);
// });
// module.exports = mongoose.model('Book',BookSchema );