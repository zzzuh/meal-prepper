import jwt from 'jsonwebtoken';
import { User } from '../api/model/user.js';
import 'dotenv/config';

export async function auth(req, res, next) {
    try {
        const token = req.cookies.authorize;
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findById(decoded.sub);
        if (!user) return res.sendStatus(401);

        req.user = user;

        next();
    }
    catch (err) {
        return res.sendStatus(401);
    }
}