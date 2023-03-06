import { useEffect, useState } from "react";
import axios from "axios";
import MealCard from "../components/mealCard";
import "../pages/meals-dashboard.css";

export default function Dashboard() {

    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getMeals();
    }, []);

    const getMeals = async() => {
        const results = await axios.get('http://localhost:5000/meals');

        setMeals(results.data.meal);
    }

    return (
        <div className="dashboard">
            <h1 className="center"> Meals </h1>
            <ul className="grid-container">
                {meals.map((meal) => {
                    return <div key={meal._id}>
                        <MealCard name={meal.name}/>
                    </div>
                })}
            </ul>
        </div>
    )

}