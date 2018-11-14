const User = require('../models/user.model.js');
const https = require('https');
const fetch = require('node-fetch');
let Request = require("request");
var username = 'sagi@smart.sb1';
var userpassword = 'acdc4422';
var token = 'bDUYSz5mfXMXwhvfiKKLdHFD';
var password = userpassword + token;
var jsforce = require('jsforce');
var accountRecordId = '';
var contactRecordId = '';
var return1 = {};
//initilize connection
var conn = new jsforce.Connection({
    // you can change loginUrl to connect to sandbox or prerelease env.
    loginUrl: 'https://test.salesforce.com'
});

// Create and Save a new order 
exports.login = (req, res) => {
    // //Validate request
    // if (!req.body.userName) {
    //     return res.status(400).send({
    //         message: "User name content can not be empty"
    //     });
    // } else if (!req.body.password) {
    //     return res.status(400).send({
    //         message: "Password content can not be empty"
    //     });
    // }

    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "https://api.smart-fertilizer.com/user/login",
        "body": JSON.stringify({
            "userName": 'sagi4422@gmail.com',
            "userIp": '123.12.1.0',
            "password": 'abcd1234'
        })
    }, (error, response, body) => {
        if (error) {
            return res.status(400).send(error);
        }
        return res.status(200).send(JSON.parse(body));
    });

};

// Find a single reservation with a Id
exports.validate = (req, res) => {
    if (!req.body.token) {
        return res.status(400).send({
            message: "Token content can not be empty"
        });
    } else if (!req.body.userId) {
        return res.status(400).send({
            message: "Password content can not be empty"
        });
    }

    Request.get("https://api.smart-fertilizer.com/user/" + req.body.userId + "/validatetoken?token=" + req.body.token, (error, response, body) => {
        if (error) {
            return res.status(400).send(error);
        }
        res.status(200).send(JSON.parse(body));
    });
};

// Find a single reservation with a Id
exports.createSF = (req, res) => {
    if (!req.body.firstname) {
        return res.status(400).send({
            message: "First Name content can not be empty"
        });
    } else if (!req.body.lastname) {
        return res.status(400).send({
            message: "Last Name content can not be empty"
        });
    } else if (!req.body.email) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    } else if (!req.body.country) {
        return res.status(400).send({
            message: "Country content can not be empty"
        });
    }

    //login to Salesforce
    conn.login(username, password, function (err, userInfo) {
        if (err) { return console.error(err); }
        // Now you can get the access token and instance URL information.
        // Save them to establish connection next time.
        //Open an Account
        conn.sobject("Account").create({
            Name: req.body.firstname + '_' + req.body.lastname,
            type: "Prospect",
            BillingCountry:  req.body.country,
            ShippingCountry:  req.body.country
        }, function (err, ret) {
            if (err || !ret.success) { return res.status(400).send(error); }
            accountRecordId = ret.id;
            //Open a Contact inside an Account
            conn.sobject("Contact").create({
                lastName: req.body.lastname,
                firstName: req.body.firstname,
                email: req.body.email,
                mailingCountry: req.body.country,
                AccountId: accountRecordId
            }, function (err, ret) {
                if (err || !ret.success) { return res.status(400).send(error); }
                contactRecordId = ret.id;
                return1 = {
                    "accountId": accountRecordId,
                    "contactId": contactRecordId
                }
                res.status(200).send(return1);
            });
        });
    });
};


exports.updateSF = (req, res) => {
    //login to Salesforce
    conn.login(username, password, function (err, userInfo) {
        if (err) { return res.status(400).send(err); }
        conn.sobject("Account").update({
            Id: req.body.accountId,
            SMARTDB_ID__c: '1542', //Need to check if this is the right variable
            Payment_Reference__c: '87564678', //Need to check if this is the right variable
            Plot_Size__c: '5', //Need to check if this is the right variable
            Crop_name__c: req.body.cropName, //Need to check if this is the right variable
            Type: "Customer"
        }, function (err, ret) {
            if (err || !ret.success) { return res.status(400).send(err); }
            conn.sobject("Contact").update({
                Id: req.body.contactId,
                Total_Area_ha__c: '5',
                Crop__c: req.body.cropName,

            }, function (err, ret) {
                if (err || !ret.success) { return res.status(400).send(err); }
                res.status(200).send(ret.id);
            });
        });

    });
};


