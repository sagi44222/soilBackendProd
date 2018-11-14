const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const varietiesSchema = new Schema({
    userId: Schema.Types.Number,
    cropId: Schema.Types.Number,
    token: Schema.Types.String
});

module.exports = mongoose.model('varieties', varietiesSchema);