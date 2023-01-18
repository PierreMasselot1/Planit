import { Pool } from "pg";
const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST || "localhost",
  database: "planit",
  password: "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});
module.exports = pool;
