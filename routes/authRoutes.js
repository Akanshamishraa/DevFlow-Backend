import express from 'express';
import {registerUser} from '../controllers/authController.js';
import {LoginUser} from '../controllers/authController.js';
import {getUserProfile} from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
 const router = express.Router();
  router.post('/register',registerUser);
  router.post('/login',LoginUser);
  router.get('/profile',getUserProfile);


 export default router;