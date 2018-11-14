module.exports = (app) => {
    const extraction = require('../../controllers/extraction.controller.js');

    // Create a new Sport Details
    app.post('/api/extraction', extraction.create);

    // Retrieve all Sport Details
    app.get('/api/extraction', extraction.findAll);

    // Retrieve a single Sport Details with Id
    app.get('/api/extraction/:Id', extraction.findOne);

    // Update a Sport Details with Id
    app.put('/api/extraction/:Id', extraction.update);

    // Delete a Sport Details with Id
    app.delete('/api/extraction/:Id', extraction.delete);
}