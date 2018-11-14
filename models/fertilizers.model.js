const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const FertilizersSchema = new Schema({
    FertilizerId: Schema.Types.Number,
    Id:Schema.Types.Number,
    AcidConcentration: Schema.Types.String
    // Name: Schema.Types.String,
    // Concentration: Schema.Types.Number,
    // ConcentrationUnit: Schema.Types.Number,
    // IsLiquid: Schema.Types.Boolean
});

module.exports = mongoose.model('Fertilizers', FertilizersSchema);