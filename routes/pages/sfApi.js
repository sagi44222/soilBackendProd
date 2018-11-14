module.exports = (app) => {
    const sfApi = require('../../controllers/sfApi.controller.js');

    // Create a new Sport Details
    app.post('/api/crops/', sfApi.getcrops);

    // Retrieve all Sport Details
    app.post('/api/varieties/', sfApi.getvarieties);

    
}