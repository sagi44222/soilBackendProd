const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const TissueTestSchema = new Schema({
    TT_Date: Schema.Types.String,
    TT_Variety: Schema.Types.String,
    TT_SamplingTime: Schema.Types.String,
    TT_Sampled: Schema.Types.String,
    N_Val: Schema.Types.Number,
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

module.exports = mongoose.model('TissueTest', TissueTestSchema);