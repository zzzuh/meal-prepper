import { User } from "../model/user.js";
import 'dotenv/config';
import bcrypt from "bcryptjs"; // encryption library for user password
import jwt from "jsonwebtoken" // enables jwt authentication;

async function signup(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const hashedPW = bcrypt.hashSync(password, 8);

        await User.create({
            username: username,
            password: hashedPW
        });

        res.sendStatus(200); // OK
    }
    catch(err) {
        console.log(err);
        res.sendStatus(403);
    }
}

async function login(req, res) {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const foundUser = await User.findOne({ username: username });
        if (!foundUser) {
            return res.sendStatus(403);
        }

        const passwordMatch = bcrypt.compareSync(password, foundUser.password);
        if (!passwordMatch) {
            return res.sendStatus(403);
        }

        const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
        const token = jwt.sign({sub: foundUser._id, exp}, process.env.SECRET);

        res.cookie("authorize", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax'
        });

        res.sendStatus(200);
    }
    catch(err) {
        res.sendStatus(404);
    }
}

async function logout(req, res) {
    try {
        res.clearCookie("authorize");
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(403);
    }
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(403);
    }
}

let userController = {
    signup,
    login,
    logout,
    checkAuth
}

export default userController;