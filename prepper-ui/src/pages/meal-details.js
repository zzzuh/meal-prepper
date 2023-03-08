import { Link, useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Detail() {

    const {id} = useParams();

    const url = `http://localhost:5000/meals/${id}`;

    useEffect(async () => {
        const res = await axios.get(`http://localhost:5000/meals/${id}`);

        setMeal(res.data.meal);
    }, [])

    const [meal, setMeal] = useState({
        name: "",
        recipe:"",
    });

    const handleNameChange = async (e) => {
        const {name, value} = e.target;

        setMeal({[name]: value});
    }

    const handleRecipeChange = (e) => {
        const {recipe, value} = e.target;

        setMeal({[recipe]: value});
    }

    const updateMeal = async () => {
        await axios.put(url, meal);
    }



    return (<div>
        <h1> Detail for {meal.name} </h1>
        <form onSubmit={updateMeal}>
            Name:
            <input name="name" value={meal.name} onChange={handleNameChange}/>
            Recipe:
            <textarea name="recipe" value={meal.recipe} onChange={handleRecipeChange} />
            <button type="submit"> Save </button>
            <Link to="/meals">
                <button> Back </button>
            </Link>
        </form>
    </div>)
}