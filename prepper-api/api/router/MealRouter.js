import express from 'express';
import mealController from '../controller/mealController.js'

const router = express.Router();

router.route('/').get(mealController.getMeals);

router.route('/').post(mealController.createMeal);

router.route('/:id').get(mealController.getMeal);

router.route('/:id').delete(mealController.deleteMeal);

router.route('/:id').put(mealController.updateMeal);

export default router;

    