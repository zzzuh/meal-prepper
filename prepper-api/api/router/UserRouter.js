import express from 'express';
import userController from '../controller/userController.js';

const router = express.Router();

router.route('/signup').post(userController.signup);


export default router;