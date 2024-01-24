const jwt = require("jsonwebtoken");
const dotenv = require('dotenv').config();

const auth =  async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(404).send("Access denied");
    }
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify;
        next();        
    } catch (error) {
        res.status(404).send("Invalid token");
    }
}

export default auth;