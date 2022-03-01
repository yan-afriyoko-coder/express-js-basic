const mongoose = require('mongoose')
const { Schema } = mongoose;

const usersSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: String, //
  password: String, //
}, { timestamps: true});

const User = mongoose.model('User', usersSchema);
module.exports = User