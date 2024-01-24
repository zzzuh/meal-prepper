const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const signup = async (req, res) => {
};

const signin = async (req, res) => {

};

const getUser = async (req, res) => {
    try {
        
        const id = req.params["id"];
        const user = await pool.query("SELECT * FROM user WHERE id = $1", [id]);

        if (user.rows.length === 0) {
            res.status(404).send("No user found")
        } else {
            res.json(user.rows[0])
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

const getAllUser = async (req, res) => {
    try {        
        const users = await pool.query("SELECT * FROM user");
        res.json(users.rows)
    } catch (error) {
        console.error(error);
        res.status(500)
    }

};

const updateUser = async (req, res) => {
    try {
        const id = req.params["id"];
        const data = req.body;

        let updateCol;
        let updateVal;

        if (data.username) {
            updateCol = "username";
            updateVal = data.username;
        } else if (data.password) {
            updateCol = "password";
            updateVal = data.password;
        } else if (data.picture) {
            updateCol = "picture";
            updateVal = data.picture;
        }

        const updatedUser = await pool.query(`UPDATE user SET ${updateCol} = $1 WHERE id = $2 RETURNING *` [updateVal, id]);

        if (updatedUser.rows.length === 0) {
            res.status(404).send("No user found");
            return;
        }

        res.status(200).send(`Updated ${updateCol}`);
    } catch (error) {
        console.error(error)
        res.status(500)
    }

};

const deleteUser = async (req, res) => {
    try {
        const id = req.params["id"];
        const deletedUser = await pool.query("DELETE FROM user WHERE id = $1 RETURNING *", [id]);

        if (deletedUser.rows.length === 0) {
            res.status(404).send("No user found");
            return;
        }

        res.status(200).send(`User ${id} deleted`);
    } catch (error) {
        console.error(error);
        res.status(500)
    }
};

