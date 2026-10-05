import express from 'express';

import * as authController from '../controllers/auth.controller.js'

const router = express.Router();


router.post('/user/register',authController.registerUser)

router.post('/user/login',authController.loginUser)

router.get('/user/logout',authController.logoutUser)

export default router;

