const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const extractionSchema = new Schema({
    type: Schema.Types.String,
    value: {
        name: Schema.Types.String,
        id: Schema.Types.Number
    }
});

module.exports = mongoose.model('extraction', extractionSchema);