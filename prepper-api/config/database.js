const Pool = require("pg").Pool;
const dotenv = require("dotenv").config();

const pool = new Pool({
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    host: "localhost",
    port: "5432",
    database: process.env.PSQL_DB
});

export default pool;
