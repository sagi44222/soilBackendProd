module.exports = (app) => {
    const unites = require('../../controllers/unites.controller.js');

    // Create a new Sport Details
    app.post('/api/unites', unites.create);

    // Retrieve all Sport Details
    app.get('/api/unites', unites.findAll);

    // Retrieve a single Sport Details with Id
    app.get('/api/unites/:Id', unites.findOne);

    // Update a Sport Details with Id
    app.put('/api/unites/:Id', unites.update);

    // Delete a Sport Details with Id
    app.delete('/api/unites/:Id', unites.delete);
}