const express = require('express');

const VehiclesController = require('./controllers/VehiclesController'); 

const routes = express.Router();

routes.get('/vehicles/', VehiclesController.index)
routes.get('/vehicles/:id', VehiclesController.index)
routes.post('/vehicles/', VehiclesController.create)
routes.put('/vehicles/:id', VehiclesController.update)
routes.delete('/vehicles/:id', VehiclesController.delete)

module.exports = routes;