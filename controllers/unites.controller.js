const Unit = require('../models/unites.model.js');

// Create and Save a new order 
exports.create = (req, res) => {
    //Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name content can not be empty"
        });
    } else if (!req.body.id) {
        return res.status(400).send({
            message: "Id content can not be empty"
        });
    }

    const unit = new Unit({
        name: req.body.name,
        id: req.body.id
    });

    // Save Order in the database
    unit.save()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Unit."
            });
        });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Unit.find()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Units."
            });
        });
}

// Find a single order with a Id
exports.findOne = (req, res) => {
    Unit.findById(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Unit not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Unit not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving order with id " + req.params.Id
            });
        });
};

// Update a order identified by the Id in the request
exports.update = (req, res) => {
    //Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    } else if (!req.body.id) {
        return res.status(400).send({
            message: "Id content can not be empty"
        });
    }

    // Find order and update it with the request body
    Unit.findByIdAndUpdate(req.params.Id, {
        name: req.body.name,
        id: req.body.id
    }, { new: true })
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Unit not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Unit not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating Unit with id " + req.params.Id
            });
        });
};

// Delete a order with the specified Id in the request
exports.delete = (req, res) => {
    Unit.findByIdAndRemove(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "Order not found with id " + req.params.Id
                });
            }
            res.send({ message: "Unit deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Unit not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete Unit with id " + req.params.Id
            });
        });
};