module.exports = (app) => {
    const nutrients = require('../../controllers/nutrients.controller.js');

    // Create a new Sport Details
    app.post('/api/nutrients', nutrients.create);

    // Retrieve all Sport Details
    app.get('/api/nutrients', nutrients.findAll);

    // Retrieve a single Sport Details with Id
    app.get('/api/nutrients/:Id', nutrients.findOne);

    // Update a Sport Details with Id
    app.put('/api/nutrients/:Id', nutrients.update);

    // Delete a Sport Details with Id
    app.delete('/api/nutrients/:Id', nutrients.delete);
}