const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
    fullname:String,
    email:String
});
userSchema.methods.genPashHash = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
userSchema.methods.isValidPassword = (password, passHash) => {
    return bcrypt.compareSync(password, passHash);
}
const users = module.exports = mongoose.model('users', userSchema);
