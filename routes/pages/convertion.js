module.exports = (app) => {
    const covert = require('../../controllers/convertion.controller.js');

    // Create a new Sport Details
    app.post('/api/convertion', covert.getConvertion);

}