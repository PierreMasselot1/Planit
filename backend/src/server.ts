import express from "express";
import passportLocal from "passport-local";

import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

import habitRouter from "./routes/habit";
import todoRouter from "./routes/todo";
import dailiesRouter from "./routes/dailies";
import authRouter from "./routes/auth";
import knex from "./config/knex";

const cors = require("cors");
const app = express();
var session = require("express-session");
const LocalStrategy = passportLocal.Strategy;

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
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
app.use(cookieParser());
app.use(passport.initialize());
//app.use(passport.authenticate("session"));

// Passport config
passport.use(
  new LocalStrategy(async (username: string, password: string, done) => {
    console.log("strategyyyy");
    let user = await knex("user")
      .where("username", username)
      .select("*")
      .first();
    if (!user) {
      user = await knex("user").where("email", username).select("*").first();
    }
    if (!user) return done(null, false);
    if (!user.password) return done(null, false);
    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        console.log(user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
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
