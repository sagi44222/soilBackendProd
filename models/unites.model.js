const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const unitSchema = new Schema({
    name: Schema.Types.String,
    id:Schema.Types.Number
});

module.exports = mongoose.model('unit', unitSchema);