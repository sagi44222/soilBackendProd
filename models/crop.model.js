const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const CropSchema = new Schema({
    CropId: Schema.Types.Number,
    VarietyId:Schema.Types.Number,
    YieldGoalId: Schema.Types.Number,
    plantingDate:Schema.Types.Date
});

module.exports = mongoose.model('Crop', CropSchema);