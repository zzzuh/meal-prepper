import { User } from "../model/user.js";
import 'dotenv/config';
import bcrypt from "bcryptjs"; // encryption library for user password
import jwt from "jsonwebtoken";

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
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = await User.findOne({
        username: username
    });
    if (!foundUser) {
        res.sendStatus(403);
    }

    const passwordMatch = bcrypt.compareSync(password, foundUser.password);
    if (!passwordMatch) {
        res.sendStatus(403);
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    const token = jwt.sign({sub: foundUser._id, exp: exp}, process.env.SECRET);

    res.send(token);
}

async function logout(req, res) {}

let userController = {
    signup,
    login,
    logout,
}

export default userController;