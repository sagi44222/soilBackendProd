module.exports = (app) => {
    const user = require('../../controllers/user.controller.js');

    // Create a new Sport Details
    app.post('/api/login/', user.login);

    // Retrieve all Sport Details
    app.post('/api/validatetoken/', user.validate);

    app.post('/api/signup/', user.createSF);

    app.post('/api/updatecustomer/', user.updateSF);

    // Retrieve a single Sport Details with Id
  // app.get('/api/pages/sportdetails/:Id', details.findOne);

    // Update a Sport Details with Id
  //  app.put('/api/pages/sportdetails/:Id', details.update);

    // Delete a Sport Details with Id
   // app.delete('/api/pages/sportdetails/:Id', details.delete);
}