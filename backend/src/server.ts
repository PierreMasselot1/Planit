import express, { Request, Response, NextFunction } from "express";
import passportLocal from "passport-local";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import habitRouter from "./routes/habit";
import todoRouter from "./routes/todo";
import dailiesRouter from "./routes/dailies";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import knex from "./config/knex";

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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, //change in prod once we get there lmao
  })
);
app.use(cookieParser());
var bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate("session"));

// Passport config
passport.use(
  new LocalStrategy(async (username, password, done) => {
    let user = await knex("user")
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

passport.serializeUser(function (user, cb) {
  console.log("serializeUser");
  console.log(user);
  process.nextTick(function () {
    return cb(null, {
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log("deserializeUser");
  console.log(user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

const authenticateUser = (req, res, next) => {
  passport.authenticate("local", { session: true }, (err, user, info) => {
    console.log(info);
    if (err) {
      console.error(err);
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(401).send("Authentication Failed");
    }
    req.user = user; // Attach user object to request
    console.log("authenticateUser");
    console.log(user);
    next();
  })(req, res, next);
};

const port: string = process.env.PORT;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/api/auth/login", authenticateUser, (req, res) => {
  res.send("success");
});

// Map routes
app.use("/api/todo", todoRouter);
app.use("/api/habit", habitRouter);
app.use("/api/dailies", dailiesRouter);
app.use("/api/user", authenticateUser, userRouter);
app.use("/api/auth", authRouter);
