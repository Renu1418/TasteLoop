import express from 'express';

import * as foodController from '../controllers/food.controller.js'

import {authMiddleware,authorize} from '../middlewares/auth.middleware.js';

import multer from 'multer';

const upload = multer({

    storage:multer.memoryStorage(),

});

const foodRouter = express.Router();

// POST /api/food/ - [ProtectedRoute]

foodRouter.post('/',authMiddleware,authorize('foodpartner'), upload.single('video'), foodController.createFood);

export default foodRouter;

