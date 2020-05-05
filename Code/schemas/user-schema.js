const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//model for a user
const userSchema = new Schema({
    name: String,
    // given_name: String,
    //family_name: String,
    googleId: Number,
    exp: Number

});

const User = mongoose.model('user', userSchema);

module.exports= User;