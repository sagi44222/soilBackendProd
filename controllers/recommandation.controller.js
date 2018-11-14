const Recommandation = require('../models/recommandation.model.js');
const https = require('https');
const fetch = require('node-fetch');
let Request = require("request");

// Create and Save a new order 
exports.getDetails = (req, res) => {
    //Validate request
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://api.smart-fertilizer.com/recommendation/" + req.body.userId + "?token=" + req.body.token,
        "body": JSON.stringify({
            "Farmer": req.body.Farmer,
            "Crop": req.body.Crop,
            "Plot": req.body.Plot,
            "Fertilizers": req.body.Fertilizers,
            // "WaterTest": req.body.WaterTest,
            // "Irrigation": req.body.Irrigation,
            // "TissueTest": req.body.TissueTest,
            "SoilTest": req.body.SoilTest,
            "BaseDressing": req.body.BaseDressing
        })
    }, (error, response, body) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(body);
    });

};
