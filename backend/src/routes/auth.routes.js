import express from 'express';
import * as authController from '../controllers/auth.controller.js'
import {authMiddleware,authorize} from '../middlewares/auth.middleware.js';


const router = express.Router();


router.post('/user/register',authController.registerUser)
router.post('/user/login',authController.loginUser)
router.get('/user/logout',authController.logoutUser)


// Check currently logged-in user
router.get('/user/me', authMiddleware, authController.getCurrentUser)

export default router;

