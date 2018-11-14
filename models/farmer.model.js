const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const FarmerSchema = new Schema({
    // UniqeIdentifier: Schema.Types.String,
    Email:Schema.Types.String,
    FirstName: Schema.Types.String,
    LastName:Schema.Types.String,
    Country: Schema.Types.String,
    State:Schema.Types.String,
    // City: Schema.Types.String,
    Zip:Schema.Types.String,
    // Address: Schema.Types.String,
    Phone:Schema.Types.String,
    // Cellular: Schema.Types.String
});

module.exports = mongoose.model('Farmer', FarmerSchema);