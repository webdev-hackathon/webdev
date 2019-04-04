const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username:String,
    password:String
})
const users = module.exports = mongoose.model('users',userSchema);
