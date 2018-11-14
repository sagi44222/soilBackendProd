const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

 const Farmer = require('./farmer.model.js');
 const FarmerSchema = mongoose.model('Farmer').schema;

const Crop = require('./crop.model.js');
const CropSchema = mongoose.model('Crop').schema;

const Plot = require('./plot.model.js');
const PlotSchema = mongoose.model('Plot').schema;

const Fertilizers = require('./fertilizers.model.js');
const FertilizersSchema = mongoose.model('Fertilizers').schema;

const WaterTest = require('./waterTest.model.js');
const WaterTestSchema = mongoose.model('WaterTest').schema;

const Irrigation = require('./irrigation.model.js');
const IrrigationSchema = mongoose.model('Irrigation').schema;

const TissueTest = require('./tissueTest.model.js');
const TissueTestSchema = mongoose.model('TissueTest').schema;

const SoilTest = require('./soilTest.model.js');
const SoilTestSchema = mongoose.model('SoilTest').schema;

const BaseDressing = require('./baseDressing.model.js');
const BaseDressingSchema = mongoose.model('BaseDressing').schema;

const recommandationSchema = new Schema({
    UserId:Schema.Types.Number,
    Token:Schema.Types.String,
    Farmer: FarmerSchema,
    Crop: CropSchema,
    Plot: PlotSchema,
    Fertilizers: FertilizersSchema,
    WaterTest: WaterTestSchema,
    Irrigation: IrrigationSchema,
    TissueTest: TissueTestSchema,   
    SoilTest: SoilTestSchema,
    BaseDressing: BaseDressingSchema
});

module.exports = mongoose.model('recommandation', recommandationSchema);