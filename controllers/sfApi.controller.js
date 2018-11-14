const Crops = require('../models/crops.model.js');
const Varieties = require('../models/varieties.model.js');
const https = require('https');
const fetch = require('node-fetch');
let Request = require("request");

// Create and Save a new order 
exports.getcrops = (req, res) => {
    //Validate request
    if (!req.body.userId) {
        return res.status(400).send({
            message: "User id content can not be empty"
        });
    } else if (!req.body.token) {
        return res.status(400).send({
            message: "Token content can not be empty"
        });
    }

    Request.get({
        "headers": { "content-type": "application/json" },
        "url": "https://api.smart-fertilizer.com/crop/" + req.body.userId + "/cropnames?token=" + req.body.token
    }, (error, response, body) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(JSON.parse(body));
    });

};

// Find a single reservation with a Id
exports.getvarieties = (req, res) => {
    if (!req.body.userId) {
        return res.status(400).send({
            message: "User id content can not be empty"
        });
    } else if (!req.body.token) {
        return res.status(400).send({
            message: "Token content can not be empty"
        });
    } else if (!req.body.cropId) {
        return res.status(400).send({
            message: "Crop Id content can not be empty"
        });
    }

    Request.get("https://api.smart-fertilizer.com/crop/" + req.body.userId + "/" + req.body.cropId + "?token=" + req.body.token, (error, response, body) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(200).send(JSON.parse(body));
    });
};
