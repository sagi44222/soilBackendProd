const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const IrrigationSchema = new Schema({
    TotalWater: {
        Totalwater:Schema.Types.Number
    },
    ListOfStages:[{
        Totalwater:Schema.Types.Number
    }]
});

module.exports = mongoose.model('Irrigation', IrrigationSchema);