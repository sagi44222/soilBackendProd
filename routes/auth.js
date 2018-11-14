const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const jwt = require('jsonwebtoken');
const Config = require('../config');
const Logger = require('../services/logger');

router.post('/login', (req, res) => {
    if (!req.body.email) {
        res.status(400).json({
            status: 'ERROR',
            error: 'REQUEST_INVALID',
            description: 'Email not found'
        });
        return;
    }
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (!user) {
                res.status(400).json({
                    status: 'ERROR',
                    error: 'NOT_REGISTERED',
                    description: 'Authentication failed. User not found'
                });
            }
            else {
                user.comparePassword(req.body.password, (err, isMatch) => {
                    if (isMatch && !err) {
                        let token = jwt.sign(JSON.stringify({_id: user._id, timeStamp: Date.now()}), Config.jwtSecret);
                        let u = user.toJSON();
                        res.json({token: token, user: u});
                    } else {
                        res.status(400).json({
                            status: 'ERROR',
                            error: 'WRONG_CREDENTIALS',
                            description: 'Wrong Credentials'
                        });
                    }
                });
            }
        })
        .catch(err => {
            Logger.log.error('Error while fetching User From Database');
            Logger.log.error(err);
            res.status(500).json({
                status: 'ERROR',
                error: 'DATABASE_ERROR',
                description: 'Error while fetching user list.'
            });
        })
});

module.exports = router;
