import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Detail() {

    const {id} = useParams();

    const url = `http://localhost:5000/meals/${id}`;

    useEffect(() => {
        getMeal();
    }, [])

    const [meal, setMeal] = useState({
        name: "",
        recipe:"",
    });

    const [mode, setMode] = useState('display');

    const getMeal = async () => {
        const res = await axios.get(url);

        setMeal(res.data.meal);
    }



    return (<div>
        <h1> Detail for {meal.name} </h1>
        {mode === 'display' ? (
            <div>
                <p>Name: {meal.name} </p>
                <p>Recipe: {meal.recipe} </p>
            </div>
        ) : (
            <>
            </>
        )}
    </div>)
}