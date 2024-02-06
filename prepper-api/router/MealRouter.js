import express from 'express';
import mealController from '../controller/mealController.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(mealController.getAllMeal);

router.route('/:userID').post(auth, mealController.createMeal);

router.route('/:userID/:mealID').get(auth, mealController.getMeal);

router.route('/:userID/:mealID').delete(auth, mealController.deleteMeal);

router.route('/:userID/:mealID').put(auth, mealController.updateMeal);

export default router;

    