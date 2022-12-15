import { Request, Response } from "express";
const express = require("express");
const cors = require("cors");
const app = express();
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'YOUR_API_IDENTIFIER',
  issuerBaseURL: `https://dev-hfnpcabx1n3viyfj.us.auth0.com/`,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
const port: number = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

const todoRouter = require("./routes/todo");
//map routes
app.use("/api/todo", todoRouter);

app.get("/api/ping", (req: Request, res: Response) => {
  res.json("beep boop");
});
