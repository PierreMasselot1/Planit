import express from "express";
import habitRouter from "./routes/habit";
import todoRouter from "./routes/todo";

const cors = require("cors");
const app = express();
require("dotenv").config();
const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: "planit-auth",
  issuerBaseURL: `https://dev-hfnpcabx1n3viyfj.us.auth0.com/`,
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
const port: string = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

//map routes
app.use("/api/todo", checkJwt, todoRouter);
app.use("/api/habit", checkJwt, habitRouter);
