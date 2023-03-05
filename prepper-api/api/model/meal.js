import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    name: String,
    recipe: String,
});

export const Meal = mongoose.model("Meal", mealSchema);