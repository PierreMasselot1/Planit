import { Pool, Client } from "pg";
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'planit',
password: 'postgres',
port: 5432
});

module.exports = pool;