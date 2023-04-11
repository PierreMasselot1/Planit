const knex = require("knex");

const connection =
  process.env.CONNECTION_STRING === undefined
    ? {
        user: "postgres",
        host: process.env.DB_HOST || "localhost",
        database: "planit",
        password: "postgres",
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5435,
      }
    : { connectionString: process.env.CONNECTION_STRING };

const knexConfig = {
  client: "pg",
  connection: connection,
  pool: {
    min: 2,
    max: 10,
  },
};

const db = knex(knexConfig);

db.raw("SELECT 1")
  .then(() => console.log("Successfully connected to the database"))
  .catch((error) =>
    console.error("Error connecting to the database: ", error.stack)
  );

export default db;
