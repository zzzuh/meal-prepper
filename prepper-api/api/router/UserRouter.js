import express from 'express';
import userController from '../controller/userController.js';
import { auth } from '../../middleware/auth.js';

const router = express.Router();

router.route('/signup').post(userController.signup);
router.route('/login').post(userController.login);
router.route('/logout').get(userController.logout);
router.route('/auth').get(auth, userController.checkAuth);


export default router;