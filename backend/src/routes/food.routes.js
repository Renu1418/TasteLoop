import express from 'express';
import upload from '../middlewares/upload.middleware.js'
import { createFood, getFoodItems, getFoodPartnerById, likeFood , saveFood, getMyLikes, getMySaves} from '../controllers/food.controller.js'
import {authMiddleware,authorize} from '../middlewares/auth.middleware.js';


const foodRouter = express.Router();

// /api/food/ - [ProtectedRoute]

foodRouter.post('/',authMiddleware,authorize('foodpartner'), upload.single('file'), createFood);
foodRouter.get('/',authMiddleware, getFoodItems);
foodRouter.get('/food-partner/:id',authMiddleware, getFoodPartnerById);


foodRouter.post('/like', authMiddleware,authorize('client'), likeFood);
foodRouter.post('/save', authMiddleware,authorize('client'), saveFood);


foodRouter.get('/my-likes', authMiddleware, authorize('client'), getMyLikes);
foodRouter.get('/my-saves', authMiddleware, authorize('client'), getMySaves);

export default foodRouter;

