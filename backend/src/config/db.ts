import { Pool } from "pg";

const pool =
  process.env.CONNECTION_STRING === undefined
    ? new Pool({
        user: "postgres",
        host: process.env.DB_HOST || "localhost",
        database: "planit",
        password: "postgres",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      })
    : new Pool({
        connectionString: process.env.CONNECTION_STRING,
      });

pool.query("SELECT 1", (err, res) => {
  if (err) {
    console.error("Error connecting to the database: ", err.stack);
  } else {
    console.log("Successfully connected to the database");
  }
});

module.exports = pool;
