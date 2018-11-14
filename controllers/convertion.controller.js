const Crops = require('../models/crops.model.js');
const Varieties = require('../models/varieties.model.js');
const https = require('https');
const fetch = require('node-fetch');
let Request = require("request");
var nutrients = [
    {
        "key": "n",
        "selected": 0,
        "forms": [{ "key": "n", "label": "N" }, { "key": "no3", "label": "NO3" }, {
            "key": "nh4",
            "label": "NH4"
        }, { "key": "", "label": "NH2" }]
    },
    {
        "key": "p",
        "selected": 0,
        "forms": [{ "key": "p", "label": "P" }, { "key": "po4", "label": "PO4" }, {
            "key": "P2O5",
            "label": "P2O5"
        }, { "key": "H2PO4", "label": "H2PO4" }]
    },
    { "key": "k", "selected": 0, "forms": [{ "key": "k", "label": "K" }, { "key": "k2o", "label": "K2O" }] },
    {
        "key": "ca",
        "forms": [{ "key": "ca", "label": "Ca" }, { "key": "cao", "label": "CaO" }, { "key": "CacO3", "label": "Caco3" }]
    },
    {
        "key": "mg",
        "forms": [{ "key": "mg", "label": "Mg" }, { "key": "mgo", "label": "mgo" }, { "key": "CacO3", "label": "CacO3" }]
    },
    {
        "key": "s",
        "forms": [{ "key": "s", "label": "S" }, { "key": "so4", "label": "SO4" }]
    },
    {
        "key": "hco3",
        "forms": [{ "key": "hco3", "label": "HCO3" }, { "key": "caco3", "label": "CacO3" }]
    },
    { "key": "b", "forms": [{ "key": "B", "label": "B" }] },
    { "key": "fe", "forms": [{ "key": "fe", "label": "Fe" }] },
    { "key": "mn", "forms": [{ "key": "mn", "label": "Mn" }] },
    { "key": "zn", "forms": [{ "key": "zn", "label": "Zn" }] },
    { "key": "cu", "forms": [{ "key": "cu", "label": "Cu" }] },
    { "key": "mo", "forms": [{ "key": "mo", "label": "Mo" }] },
    { "key": "na", "forms": [{ "key": "na", "label": "Na" }] },
    { "key": "cl", "forms": [{ "key": "cl", "label": "Cl" }] }
];


var ruls = {
    "n-nutrient": {
        "n": {
            "molecularWeight": 14,
            "charge": 1,
            "form_factor": 1
        },
        "no3": {
            "molecularWeight": 62,
            "charge": 1,
            "form_factor": 4.43
        },
        "nh4": {
            "molecularWeight": 18,
            "charge": 1,
            "form_factor": 1.28
        },
        "nh2": {
            "molecularWeight": 16,
            "charge": 1,
            "form_factor": 1.14
        }
    },
    "p-nutrient": {
        "p": {
            "molecularWeight": 30.97,
            "charge": 1,
            "form_factor": 1
        },
        "po4": {
            "molecularWeight": 94.97,
            "charge": 3,
            "form_factor": 3.066
        },
        "p2o5": {
            "molecularWeight": 141.94,
            "charge": 2,
            "form_factor": 2.2915
        },
        "h2po4": {
            "molecularWeight": 96.7,
            "charge": 1,
            "form_factor": 3.13
        }
    },
    "k-nutrient": {
        "k": {
            "molecularWeight": 39,
            "charge": 1,
            "form_factor": 1
        },
        "k2o": {
            "molecularWeight": 94,
            "charge": 1,
            "form_factor": 1.205
        }
    },
    "ca-nutrient": {
        "ca": {
            "molecularWeight": 40,
            "charge": 2,
            "form_factor": 1
        },
        "cao": {
            "molecularWeight": 56,
            "charge": 2,
            "form_factor": 1.399
        },
        "caco3": {
            "molecularWeight": 100,
            "charge": 2,
            "form_factor": 2.5
        }
    },
    "mg-nutrient": {
        "mg": {
            "molecularWeight": 24,
            "charge": 2,
            "form_factor": 1
        },
        "mgo": {
            "molecularWeight": 40,
            "charge": 2,
            "form_factor": 1.657
        },
        "caco3": {
            "molecularWeight": 100,
            "charge": 2,
            "form_factor": 4.1667
        }
    },
    "s-nutrient": {
        "s": {
            "molecularWeight": 32,
            "charge": 2,
            "form_factor": 1
        },
        "so4": {
            "molecularWeight": 96,
            "charge": 2,
            "form_factor": 3
        },
        "so3": {
            "molecularWeight": 80,
            "charge": 2,
            "form_factor": 2.5
        }
    },
    "hco3-nutrient": {

        "hco3": {
            "molecularWeight": 61,
            "charge": 1,
            "form_factor": 1
        },
        "caco3": {
            "molecularWeight": 100,
            "charge": 2,
            "form_factor": 0.8196
        }
    },
    "b-nutrient": {
        "b": {
            "molecularWeight": 10.811,
            "charge": 2,
            "form_factor": 1
        }
    },
    "fe-nutrient": {
        "fe": {
            "molecularWeight": 55.845,
            "charge": 2,
            "form_factor": 1
        }
    },
    "mn-nutrient": {
        "mn": {
            "molecularWeight": 54.938,
            "charge": 2,
            "form_factor": 1
        }
    },
    "zn-nutrient": {
        "zn": {
            "molecularWeight": 65.38,
            "charge": 2,
            "form_factor": 1
        }
    },
    "cu-nutrient": {
        "cu": {
            "molecularWeight": 63.546,
            "charge": 2,
            "form_factor": 1
        }
    },
    "mo-nutrient": {
        "mo": {
            "molecularWeight": 95.94,
            "charge": 2,
            "form_factor": 1
        }
    },
    "na-nutrient": {
        "na": {
            "molecularWeight": 22.9897,
            "charge": 1,
            "form_factor": 1
        }
    },
    // Al Todo
    "al-nutrient": {
        "al": {
            "molecularWeight": 26.981539,
            "charge": 3,
            "form_factor": 1
        }
    },
    "cl-nutrient": {
        "cl": {
            "molecularWeight": 35.453,
            "charge": 1,
            "form_factor": 1
        }
    }
}

var ConcentrationUnits = [
    {
        unit: 0,
        me_hydroponic: "ml/m<sup>3</sup>",
        us_hydroponic: "oz/100gal",

    },
    {
        unit: 1,
        me_hydroponic: "l/m<sup>3</sup>",
        us_hydroponic: "gal/100gal",
        me: 'liter',
        us: 'gal',

    },
    {
        unit: 2,
        me_hydroponic: "gr/m<sup>3</sup>",
        us_hydroponic: "mg/l",
        me: 'kg',
        us: 'lbs',

    },
    {
        unit: 3,
        me_hydroponic: "gr/m<sup>3</sup>",
        us_hydroponic: "mg/l",
        me: 'kg',
        us: 'lbs',

    },
    {
        unit: 4,
        me_hydroponic: "l/m<sup>3</sup>",
        us_hydroponic: "gal/100gal",
        me: 'liter',
        us: 'gal',

    },
    {
        unit: 6,
        me: 'kg',
        us: 'lbs',
        me_hydroponic: "gr/m<sup>3</sup>",
        us_hydroponic: "mg/l",
    }
]


var unitsOptions = {
    "n_no3": [{ id: 0, name: 'N-NO3' }, { id: 1, name: 'NO3' }],
    "n_nh4": [{ id: 0, name: 'N-NH4' }, { id: 1, name: 'NH4' }],
    "n_nh2": [{ id: 0, name: 'N-NH2' }, { id: 1, name: 'NH2' }],
    "n": [{ id: 0, name: 'N' }, { id: 1, name: 'NO3' }, { id: 2, name: 'NH4' }],
    "p": [{ id: 0, name: 'P' }, { id: 1, name: 'PO4' }, { id: 2, name: 'P2O5' }, { id: 3, name: 'H2PO4' }],
    "k": [{ id: 0, name: 'K' }, { id: 1, name: 'K2O' }],
    "ca": [{ id: 0, name: 'Ca' }, { id: 1, name: 'CaO' }, { id: 2, name: 'CaCO3' }],
    "mg": [{ id: 0, name: 'Mg' }, { id: 1, name: 'MgO' }, { id: 2, name: 'CaCO3' }],
    "s": [{ id: 0, name: 'S' }, { id: 1, name: 'SO4' }],
    "hco3": [{ id: 0, name: 'HCO3' }, { id: 1, name: 'CaCO3' }]
}

// Create and Save a new order 
exports.getConvertion = (req, res) => {

    var result = {
        //// getConvertedRules: this.getConvertedRules(),
        //// getNutrients: this.getNutrients(),
        changeNutrientForm: changeNutrientForm(req.body.nutrient, req.body.value, req.body.currentNutrientForm, req.body.toNutrientForm, req.body.fromUnit, req.body.toUnit, req.body.layerDepth, req.body.bulkDensity),
        changeFromPPMtoUnit: changeFromPPMtoUnit(req.body.nutrient, req.body.toNutrientForm, req.body.value, req.body.toUnit, req.body.layerDepth, req.body.bulkDensity),
        rollbackToBaseNutrientForm: rollbackToBaseNutrientForm(req.body.nutrient, req.body.currentNutrientForm, req.body.value),
        rollbackToPPm: rollbackToPPm(req.body.nutrient, req.body.currentNutrientForm, req.body.value, req.body.fromUnit, req.body.layerDepth, req.body.bulkDensity),
        //// getConcentrationUnitLabel:this.getConcentrationUnitLabel(),
        getNutrientFactor: getNutrientFactor(req.body.nutrient, req.body.currentNutrientForm, req.body.toNutrientForm),
        getUnitOptions: getUnitOptions(req.body.nutrient),
        getAreaYieldGoalFactor: getAreaYieldGoalFactor(req.body.yieldAreaUnitId)
    };

    res.send(result);
};


function getConvertedRules() {
    return coversationRules;
}

/**/
function getNutrients() {
    return nutrients;
}

function changeNutrientForm(nutrient, value, currentNutrientForm, toNutrientForm, fromUnit, toUnit, layerDepth, bulkDensity) {

    if (value === null || value === undefined || value === '') {
        return '';
    }

    if (value === 0)
        return 0;

    toNutrientForm = toNutrientForm.replace('0', 'o');

    // In case of N-no3 N-NH4 N-NH2 the same as N
    if (currentNutrientForm.indexOf("N_") === 0 || currentNutrientForm.indexOf("N-") === 0) {
        currentNutrientForm = "N";
    }

    if (toNutrientForm.indexOf("N_") === 0 || toNutrientForm.indexOf("N-") === 0) {
        toNutrientForm = "N";
    }

    if (nutrient.indexOf("NO3") > -1 || nutrient.indexOf("NH4") > -1 || nutrient.indexOf("NH2") > -1) {
        nutrient = "N";
    }

    fromUnit = fromUnit || 'ppm';
    toUnit = toUnit || 'ppm';

    //in case moving from different form (none of the base form)
    var rule = ruls[nutrient.toLowerCase() + "-nutrient"][toNutrientForm.toLowerCase()];

    // in case talkinhg  only in ppm simple conversion
    if (fromUnit === 'ppm' && toUnit === 'ppm') {
        value = rollbackToBaseNutrientForm(nutrient, currentNutrientForm, value);
        return value * rule.form_factor;
    }

    // moving from ppm to different unit
    if (fromUnit === 'ppm' && toUnit !== 'ppm') {
        return changeFromPPMtoUnit(nutrient, currentNutrientForm, value, toUnit, layerDepth, bulkDensity);
    }

    if (fromUnit !== 'ppm') {
        value = rollbackToPPm(nutrient, currentNutrientForm, value, fromUnit, layerDepth, bulkDensity);
        value = rollbackToBaseNutrientForm(nutrient, currentNutrientForm, value);
        value = value * rule.form_factor;

        if (toUnit === 'ppm') {
            return value;
        } else {
            //convert to wanted unit;
            return changeFromPPMtoUnit(nutrient, toNutrientForm, value, toUnit, layerDepth, bulkDensity);
        }
    }
}

function changeFromPPMtoUnit(nutrient, nutrientForm, value, toUnit, _layerDepth, _bulkDensity) {
    var rule = ruls[nutrient.toLowerCase() + "-nutrient"][nutrientForm.toLowerCase()];
    var layerDepth = _layerDepth || 20;
    var bulkDensity = _bulkDensity || 1.2;
    var convertedValue = value;

    switch (toUnit.toLowerCase()) {
        case "meq/l":
            convertedValue = (value * rule.charge) / rule.molecularWeight;
            break;
        case "mmol/l":
            convertedValue = value / rule.molecularWeight;
            break;
        case "meq/100g":
        case "cmolc/dm3":
        case "cmol+/kg":
        case "meq/100cm3":
            convertedValue = (value * rule.charge * 0.1) / rule.molecularWeight;
            break;
        case "kg/ha":
            convertedValue = value * bulkDensity * layerDepth * 0.1;
            break;
        case "%":
            convertedValue = value * 0.0001
            break;
        case "lbs/acre":
            convertedValue = value * bulkDensity * layerDepth * 0.1 * 0.892179122
            break;
        case "mg/kg":
        case "mg/l":
        case "mg/dm3":
            convertedValue = value;
            break;
        default:
    }

    //$log.debug("****changeFromPPMtoUnit nutrient=[" + nutrient + "] nutrientForm =[" + nutrientForm + "]ppmValue=[" + value + "] toUnit" + toUnit + " equals=[" + convertedValue + "]");
    return convertedValue;
}

function rollbackToPPm(nutrient, currentNutrientForm, value, fromUnit, _layerDepth, _bulkDensity) {
    var rule = ruls[nutrient.toLowerCase() + "-nutrient"][currentNutrientForm.toLowerCase()];
    var layerDepth = _layerDepth || 20;
    var bulkDensity = _bulkDensity || 1.2;
    var ppmValue = value;

    switch (fromUnit.toLowerCase()) {
        case "mmol/l":
            ppmValue = (value * rule.molecularWeight);
            break;
        case "meq/l":
            ppmValue = (value * rule.molecularWeight) / rule.charge;
            break;
        case "meq/100g":
        case "cmolc/dm3":
        case "cmol+/kg":
        case "meq/100cm3":
            ppmValue = (value * rule.molecularWeight) / (rule.charge * 0.1);
            break;
        case "mg/l":
        case "mg/kg":
        case "mg/dm3":
            ppmValue = value;
            break;
        case "%":
            ppmValue = value / 0.0001;
            break;
        case "kg/ha":
            ppmValue = value / (bulkDensity * layerDepth * 0.1);
            break;
        case "lbs/acre":
            ppmValue = value / (bulkDensity * layerDepth * 0.1 * 0.892179122);
            break;
        case "mg/kg":
            ppmValue = value;
            break;
    }
    return ppmValue;
}

function rollbackToBaseNutrientForm(nutrient, currentNutrientForm, value) {
    var rule = ruls[nutrient.toLowerCase() + "-nutrient"][currentNutrientForm.toLowerCase()];
    return value / rule.form_factor;
}

function getNutrientFactor(nutrient, from, to) {

    var factor;
    nutrient = nutrient.toLowerCase();
    from = from.toLowerCase();
    to = to.toLowerCase();

    if (nutrient === to) {
        factor = 1 / ruls[nutrient + "-nutrient"][from].form_factor;

    }
    else if (nutrient != from && nutrient != to) {
        var rollBackfactor = 1 / ruls[nutrient + "-nutrient"][from].form_factor;
        var newFacror = ruls[nutrient + "-nutrient"][to].form_factor
        factor = rollBackfactor * newFacror;
    }
    else {
        factor = ruls[nutrient + "-nutrient"][to].form_factor;
    }
    return factor
}

function getConcentrationUnitLabel(concentrationUnitId, applyUSMetric, isHydroponic) {
    var rule = ConcentrationUnits.filter(function (item) {
        return item.unit == concentrationUnitId;
    });
    var key = !!applyUSMetric ? 'us' : 'me' + !!isHydroponic ? '_hydroponic' : '';

    return rule[0][key];
}

function getUnitOptions(nutrient) {
    return unitsOptions[nutrient.toLowerCase()];
}

function getAreaYieldGoalFactor(yieldAreaUnitId) {
    var _factor = 1;
    switch (yieldAreaUnitId) {
        case 19:// //MT/ha
            break;
        case 20:////Tons/acre
            _factor = 0.4460895613;
            break;
        case 21://dunam
            _factor = 0.1;
            break;
        case 22: //busel
            _factor = 0.4460895613 * 2000;
            break;
    }
    return _factor;
}



