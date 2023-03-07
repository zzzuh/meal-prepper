import "../components/mealCard.css";

export default function MealCard(prop) {
    return <button className="mealCard"> {prop.name} </button>
}