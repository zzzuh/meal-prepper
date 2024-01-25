// load env variables
import dotenv from "dotenv/config.js";

// dependencies
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./router/UserRouter.js";

// create express app
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// routing
app.use('/users', userRoutes);

// if route does not exist
app.use('*', (req, res) => res.sendStatus(404));


app.listen(process.env.PORT, () => {
    console.log(`Server launched successfuly on ${process.env.PORT}`);
});