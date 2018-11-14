const Nutrients = require('../models/nutrients.model.js');

// Create and Save a new order 
exports.create = (req, res) => {
    //Validate request
    if (!req.body.type) {
        return res.status(400).send({
            message: "Type content can not be empty"
        });
    } else if (!req.body.value.id) {
        return res.status(400).send({
            message: "Id content can not be empty"
        });
    } else if (!req.body.value.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }

    const nutrients = new Nutrients({
        type: req.body.type,
        value: {
            name: req.body.value.name,
            id: req.body.value.id
        }
    });

    // Save Order in the database
    nutrients.save()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the nutrients."
            });
        });
};

// Retrieve and return all orders from the database.
exports.findAll = (req, res) => {
    Nutrients.find()
        .then(uni => {
            res.send(uni);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving nutrients."
            });
        });
}

// Find a single order with a Id
exports.findOne = (req, res) => {
    Nutrients.findById(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error retrieving nutrients with id " + req.params.Id
            });
        });
};

// Update a order identified by the Id in the request
exports.update = (req, res) => {
    //Validate request
    if (!req.body.type) {
        return res.status(400).send({
            message: "Type content can not be empty"
        });
    } else if (!req.body.value.id) {
        return res.status(400).send({
            message: "Id content can not be empty"
        });
    } else if (!req.body.value.name) {
        return res.status(400).send({
            message: "Name content can not be empty"
        });
    }

    // Find order and update it with the request body
    Nutrients.findByIdAndUpdate(req.params.Id, {
        type: req.body.type,
        value: {
            name: req.body.value.name,
            id: req.body.value.id
        }
    }, { new: true })
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            res.send(uni);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Error updating nutrients with id " + req.params.Id
            });
        });
};

// Delete a order with the specified Id in the request
exports.delete = (req, res) => {
    Nutrients.findByIdAndRemove(req.params.Id)
        .then(uni => {
            if (!uni) {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            res.send({ message: "Nutrients deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "nutrients not found with id " + req.params.Id
                });
            }
            return res.status(500).send({
                message: "Could not delete nutrients with id " + req.params.Id
            });
        });
};