import { Meal } from "../model/meal.js";

async function getMeals(req, res) {
    const all = await Meal.find();

    res.send({meal: all});
} // fetch all meals

async function getMeal(req, res) {

    const id = req.params.id;

    const food = await Meal.findById(id);

    res.send({meal: food});
} // fetch single meal

async function createMeal(req, res) {
    const name = req.body.name;
    const recipe = req.body.recipe;

    const food = await Meal.create({
        name: name,
        recipe: recipe,
    });

    res.send({meal: food});
} // create a new meal object to database

async function updateMeal(req, res) {
    const id = req.params.id;

    const name = req.body.name;
    const recipe = req.body.recipe;

    await Meal.findByIdAndUpdate(id, {
        name: name,
        recipe: recipe
    });

    const meal = await Meal.findById(id);

    res.send({meal: meal});
} // updates an existing entry

async function deleteMeal(req, res) {
    const id = req.params.id;

    await Meal.findByIdAndDelete(id);

    res.send("Deleted");
} // deletes an existing entry

let mealController = {
    getMeals, 
    getMeal, 
    createMeal, 
    updateMeal, 
    deleteMeal,
}

export default mealController;

