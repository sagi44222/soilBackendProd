const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    userName: Schema.Types.String,
    userIp: Schema.Types.String,
    password: Schema.Types.String
});

module.exports = mongoose.model('user', userSchema);