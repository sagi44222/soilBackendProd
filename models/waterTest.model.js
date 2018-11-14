const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const WaterTestSchema = new Schema({
    Name: Schema.Types.String,
    WT_Ph: Schema.Types.Number,
    WT_Ec: Schema.Types.Number,
    N_NO3_Val: Schema.Types.Number,
    N_NH4_Val: Schema.Types.Number,
    N_NH2_Val: Schema.Types.Number,
    P_Val: Schema.Types.Number,
    K_Val: Schema.Types.Number,
    Ca_Val: Schema.Types.Number,
    Mg_Val: Schema.Types.Number,
    S_Val: Schema.Types.Number,
    B_Val: Schema.Types.Number,
    Fe_Val: Schema.Types.Number,
    Mn_Val: Schema.Types.Number,
    Zn_Val: Schema.Types.Number,
    Cu_Val: Schema.Types.Number,
    Mo_Val: Schema.Types.Number,
    Na_Val:Schema.Types.Number,
    HCO3_Val:Schema.Types.Number,
    CL_Val:Schema.Types.Number
});

module.exports = mongoose.model('WaterTest', WaterTestSchema);