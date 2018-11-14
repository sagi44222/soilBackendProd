module.exports = (app) => {
    const recommandation = require('../../controllers/recommandation.controller.js');

    // Create a new Sport Details
    app.post('/api/recommandation', recommandation.getDetails);

}