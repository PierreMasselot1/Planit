import express from "express";

import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";

import habitRouter from "./routes/habit";
import todoRouter from "./routes/todo";
import dailiesRouter from "./routes/dailies";
import authRouter from "./routes/auth";

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
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      email: user.email
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const port: string = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

//map routes
app.use("/api/todo", checkJwt, todoRouter);
app.use("/api/habit", checkJwt, habitRouter);
app.use("/api/dailies", checkJwt, dailiesRouter);
app.use("/api/auth", authRouter);
