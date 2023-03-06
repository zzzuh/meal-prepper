import jwt from 'jsonwebtoken';
import { User } from '../api/model/user.js';
import 'dotenv/config';

export async function auth(req, res, next) {
    try {
        // finds jwt token from cookie
        const token = req.cookies.authorize;

        // decodes the token
        const decoded = jwt.verify(token, process.env.SECRET);

        //check if the token is expired
        if (Date.now() > decoded.exp) return res.sendStatus(403);

        // find the user from the token
        const user = await User.findById(decoded.sub);

        // check if no user was found
        if (!user) return res.sendStatus(401);

        // sets the user in request to the found in cookie
        req.user = user;

        // proceeds
        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
}