import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../components/mealCard";
import "../pages/meals-dashboard.css";
import { Link } from "react-router-dom";

export default function Dashboard() {

    const [meals, setMeals] = useState([]); // stores the meals
    const [createdFrom, setCreatedForm] = useState({
        name: "",
        recipe: "",
    })

    const handleForm = (e) => {
        const {name, value} = e.target;

        setCreatedForm({
            ...setCreatedForm,
            [name]: value,
            recipe: ""
        })
    }

    const createMeal = async(e) => {
        e.preventDefault();

        // create the meal
        const result = await axios.post('http://localhost:5000/meals', createdFrom);

        // update our meal state
        setMeals([...meals, result.data.meal]);

        // clear form state
        setCreatedForm({name:"", recipe:""});

    }

    useEffect(() => {
        getMeals();
    }, []);

    const getMeals = async() => {
        const results = await axios.get('http://localhost:5000/meals');

        setMeals(results.data.meal);
        console.log(results.data.meal)
    }

    return (
        <div className="dashboard">
            <h1> Meals </h1>
            <div className="meal-card-grid">
                {meals && meals.map((meal) => {
                    return <Link to={meal._id} key={meal._id}>
                        <MealCard name={meal.name} reipe={meal.recipe}/>
                    </Link>
                })}
            </div>

            <div>
                <h2> Create Meal </h2>
                <form onSubmit={createMeal}>
                    <input onChange={handleForm} value={createdFrom.name} name="name"/>
                    <button type="submit"> Create </button>
                </form>
            </div>
        </div>
    )

}