import express from 'express';
import upload from '../middlewares/upload.middleware.js'
import { createFood, getFoodItems, getFoodPartnerById } from '../controllers/food.controller.js'
import {authMiddleware,authorize} from '../middlewares/auth.middleware.js';


const foodRouter = express.Router();

// POST /api/food/ - [ProtectedRoute]

foodRouter.post('/',authMiddleware,authorize('foodpartner'), upload.single('file'), createFood);
foodRouter.get('/',authMiddleware, getFoodItems);
foodRouter.get('/food-partner/:id',authMiddleware, getFoodPartnerById);

export default foodRouter;

