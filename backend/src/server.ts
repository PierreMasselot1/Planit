import express from "express";
import passportLocal from "passport-local";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import habitRouter from "./routes/habit";
import todoRouter from "./routes/todo";
import labelRouter from "./routes/labels";
import dailiesRouter from "./routes/dailies";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import knex from "./config/knex";
import { User } from "@shared/types/user_types";

const cors = require("cors");
const app = express();
var session = require("express-session");
const LocalStrategy = passportLocal.Strategy;

require("dotenv").config();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.json());

const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({
  knex,
  tablename: "sessions", // optional. Defaults to 'sessions'
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, //change in prod once we get there lmao
    store,
  })
);
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(passport.session());
app.use(passport.initialize());

// Passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user: User = await knex("user")
      .where("username", username)
      .select("*")
      .first();
    if (!user) {
      user = await knex("user").where("email", username).select("*").first();
    }
    if (!user) return done(null, false);
    if (!user.password) return done(null, false);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

passport.serializeUser(function (user: User, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user: User, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

const port: string = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/api/auth/login", (req: any, res: any) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(401).send("Authentication Failed");
    }

    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ err });
      }
      const rememberUser = req.body.rememberUser;
      if (rememberUser) {
        console.log("rememberUser is true");
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
      } else {
        req.session.cookie.expires = false;
      }
      res.status(200).json({
        msg: "Success",
      });
    });
  })(req, res);
});

// Middleware function to check if user is authenticated
function isAuthenticated(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Unauthorized");
}

// Map routes
app.use("/api/todo", isAuthenticated, todoRouter);
app.use("/api/habit", isAuthenticated, habitRouter);
app.use("/api/dailies", isAuthenticated, dailiesRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/label", isAuthenticated, labelRouter);
