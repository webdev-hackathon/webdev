const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    admin:String,
    password:String,
    rules:[]
});
module.exports = mongoose.model('admins',adminSchema);