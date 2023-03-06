import "../components/mealCard.css";

export default function MealCard(prop) {
    return(
        <div>
            <button className="mealCard"> {prop.name} </button>
        </div>
    )
}