const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//model for a user
const userSchema = new Schema({
    name: String,
    googleId: Number,
    exp: Number,
    thumbnail: String,
    completed: String

});

const User = mongoose.model('user', userSchema);

module.exports= User;