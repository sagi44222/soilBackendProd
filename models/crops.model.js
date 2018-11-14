const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const cropsSchema = new Schema({
    userId: Schema.Types.Number,
    token: Schema.Types.String
});

module.exports = mongoose.model('crops', cropsSchema);