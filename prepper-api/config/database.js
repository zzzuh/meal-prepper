import psql from "pg";

const { Pool } = psql;

const pool = new Pool({
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
    host: "localhost",
    port: "5432",
    database: process.env.PSQL_DB
});

export default pool;
