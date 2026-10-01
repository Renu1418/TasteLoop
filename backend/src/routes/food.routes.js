const express = require('express');
const foodController = require('../controllers/food.controller')
const {authMiddleware,authorize} = require('../middlewares/auth.middleware');

const foodRouter = express.Router();

// POST /api/food/ - [ProtectedRoute]
foodRouter.post('/',authMiddleware,authorize('foodPartner'), foodController.createFood);

module.exports = foodRouter;