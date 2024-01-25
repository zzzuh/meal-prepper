import dotenv from "dotenv/config.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import pool from "../config/database.js";

const signup = async (req, res) => {
    try {
        const data = req.body;

        if (!data.username || !data.password) {
            res.status(404).send("Fields cannot be empty");
            return;
        }

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [data.username]);

        if (user.rows.length !== 0) {
            res.status(404).send("Username already exists");
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);

        const registeredUser = await pool.query("INSERT INTO users (username, password, picture) VALUES($1, $2, $3) RETURNING *", [data.username, hashPassword, data.picture]);
        res.json(registeredUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500);
    }
};

const signin = async (req, res) => {
    try {
        const data = req.body;
        if (!data.username || !data.password) {
            res.status(404).send("Fields cannot be empty");
            return;
        }

        const user = await pool.query("SELECT * FROM users WHERE username = $1", [data.username]);

        if (user.rows.length === 0) {
            res.status(404).send("Invalid username or password");
            return;
        }

        const isValidPassword = await bcrypt.compare(data.password, user.rows[0].password);

        if (!isValidPassword) {
            res.status(404).send("Invalid username or password");
        } else {
            const token = jwt.sign(user.rows[0], process.env.JWT_SECRET);
            res.cookie('token', token, {httpOnly: true});
            res.status(200).send("Logged in");
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }

};

const signout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).send("Logged out success");
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

const getUser = async (req, res) => {
    try {
        
        const id = req.params["id"];
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

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
        const users = await pool.query("SELECT * FROM users");
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

        // if(req.user.id !== id) {
        //     res.status(404);
        //     return;
        // }

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

        const updatedUser = await pool.query(`UPDATE users SET ${updateCol} = $1 WHERE id = $2 RETURNING *`, [updateVal, id]);

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
        const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);

        if (deletedUser.rows.length === 0) {
            res.status(404).send("No user found");
            return;
        }

        res.json(deleteUser.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500)
    }
};

const userController = {
    signup,
    signin,
    signout,
    getUser,
    getAllUser,
    updateUser,
    deleteUser
};

export default userController;
