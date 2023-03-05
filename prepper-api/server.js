// load env variables
import 'dotenv/config';

// dependencies
import express from 'express';
import meals from './api/router/MealRouter.js';
import users from './api/router/UserRouter.js';
import { connectDb } from './config/database.js';

// create express app
const app = express();
app.use(express.json());

// connects to database
connectDb();

// routing
app.use('/meals', meals);
app.use('/', users);

// if route does not exist
app.use('*', (req, res) => res.sendStatus(404));


app.listen(process.env.PORT);