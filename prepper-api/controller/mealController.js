import pool from "../config/database.js";

const getMeal = async (req, res) => {
    if (req.user.id != req.params["userID"]) {
        res.status(404).send("You do not have permission")
        return
    }
    try {
        const userID = req.params["userID"];
        const mealID = req.params["mealID"];

        const query = await pool.query("SELECT * FROM meals WHERE user_id = $1 AND id = $2", [userID, mealID]);

        if (query.rows.length === 0) {
            res.status(404).send("No meals found");
        } else {
            res.json(query.rows[0]);
            res.status(200)
        }
    } catch (error) {
        console.log(error);
        res.status(500);
    }
};

const getAllMeal = async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM meals");
        res.json(query.rows);
        res.status(200);

    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

const createMeal = async (req, res) => {
    if (req.user.id != req.params["userID"]) {
        res.status(404).send("You do not have permission")
        return
    }
    try {
        const data = req.body;
        const userID = req.params["userID"]

        if (!data.name) {
            res.status(404).send("Error in making meal");
            return
        }
        const query = await pool.query("INSERT INTO meals (user_id, name, recipe, picture) VALUES($1, $2, $3, $4) RETURNING *", 
        [userID, data.name, data.recipe, data.picture])

        res.json(query.rows[0])

    } catch (error) {
        console.error(error);
        res.status(500);
    }

};

const updateMeal = async (req, res) => {
    if (req.user.id != req.params["userID"]) {
        res.status(404).send("You do not have permission")
        return
    }
    try {
        
        const data = req.body
        const id = req.params["mealID"]
        const user_id = req.params["userID"]

        const query = await pool.query("UPDATE meals SET name = $1, recipe = $2, picture = $3 WHERE id = $4 AND user_id = $5 RETURNING *", 
        [data.name, data.recipe, data.picture, id, user_id])

        res.json(query.rows[0])
        res.status(200)

    } catch (error) {
        console.error(error);
        res.status(500)
    }
};

const deleteMeal = async (req, res) => {
    if (req.user.id != req.params["userID"]) {
        res.status(404).send("You do not have permission")
        return
    }
    try {
        const id = req.params["mealID"]
        const userID = req.params["userID"]

        const query = await pool.query("DELETE FROM meals WHERE user_id = $1 AND id = $2 RETURNING *", [userID, id])
        res.json(query.rows[0])
        res.status(200)
    } catch (error) {
        console.error(error)
        res.status(500)
    }
}

const mealController = {
    getMeal,
    getAllMeal,
    createMeal,
    updateMeal,
    deleteMeal
}

export default mealController