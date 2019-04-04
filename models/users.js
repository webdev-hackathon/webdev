const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullname:String,
    email:String
});


const users = module.exports = mongoose.model('users', userSchema);
