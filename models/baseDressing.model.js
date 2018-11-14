const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const BaseDressingSchema = new Schema({
    N_percentage_val: Schema.Types.Number,
    P_percentage_val: Schema.Types.Number,
    K_percentage_val: Schema.Types.Number,
    Ca_percentage_val: Schema.Types.Number,
    Mg_percentage_val: Schema.Types.Number,
    S_percentage_val: Schema.Types.Number,
    B_percentage_val: Schema.Types.Number,
    Fe_percentage_val: Schema.Types.Number,
    Mn_percentage_val: Schema.Types.Number,
    Zn_percentage_val: Schema.Types.Number,
    Cu_percentage_val: Schema.Types.Number,
    Mo_percentage_val: Schema.Types.Number,
    Na_percentage_val: Schema.Types.Number,
    HCO3_percentage_val: Schema.Types.Number,
    CO3_percentage_val: Schema.Types.Number,
    //Cl_percentage_val: Schema.Types.Number,
    CEC: Schema.Types.Number,
    SoilTypeId: Schema.Types.Number,
    SelectedFertilizers: [{
        FertilizerId: Schema.Types.Number,
        Id: Schema.Types.Number
        // Name: Schema.Types.String,
        // Concentration: Schema.Types.Number,
        // ConcentrationUnit: Schema.Types.Number,
        // IsLiquid: Schema.Types.Boolean,
    }]
});

module.exports = mongoose.model('BaseDressing', BaseDressingSchema);