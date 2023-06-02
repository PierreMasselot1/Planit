import passportLocal from "passport-local";
import passport from "passport";
import bcrypt from "bcryptjs";
import { User } from "@shared/types/user_types";
import express from "express";
import { Response } from "express";
import knex from "../config/knex";

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;

// Passport config
passport.use(
  new LocalStrategy((username: string, password: string, done) => {
    let user = knex("user").where("username", username).select("*");
    if (!user) {
      knex("user").where("email", username).select("*");
    }
    if (!user) return done(null, false);

    bcrypt.compare(password, user.password, (err, result: boolean) => {
      if (err) throw err;
      if (result === true) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

router.post("/login", (req, res: Response<User | any>) => {
  const name = req.body.name;
  const password = req.body.password;

  console.log("User trying to login");
  console.log("name: " + name);
  console.log("password: " + password);

  res.json({ message: "tried to login" });
});

router.post("/register", async (req, res) => {
  console.log("register endpoint");
  const name = req?.body.name; // This can be either the email or the username, it might be a good idea to split it up with separate variables
  const password = req?.body.password; // Fix: use req?.body.password instead of req?.body.name

  // Establish whether name is a username or an email

  if (!name || !password || typeof name !== "string" || typeof password !== "string") {
    res.status(400).send("Improper Values"); // Fix: Use res.status(400) to indicate a bad request
    return;
  }

  const user: User = await knex("user").where("username", name).select("*").first() as User; // Fix: Use .first() to retrieve the first matching user

  console.log("user: " + user);
  
  // Check for existing users with username
  if (user !== undefined) {
    res.status(409).send("User already exists"); // Fix: Use res.status(409) to indicate conflict
    return;
  }

  // Check for existing users with email
  const userFromEmail = await knex("user").where("email", name).select("*").first(); // Fix: Use .first() to retrieve the first matching user
  if (userFromEmail !== undefined) {
    res.status(409).send("User already exists"); // Fix: Use res.status(409) to indicate conflict
    return;
  }

  console.log("No pre-existing user found, proceeding with account creation");

  // Check if name is email or username using regex
  let username: string | undefined;
  let email: string | undefined;

  if (name.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
    console.log("name is email");
    email = name;
  } else {
    console.log("name is username");
    username = name;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await knex("user").insert({
    username: username,
    email: email,
    password: hashedPassword,
  });
  console.log("User created");

  res.send("User created"); // Send the response after successful user creation
});

router.post("/user", (req, res: Response<User | any>) => {
  //RETURN USER
});

router.post("/logout", (req, res) => {
  //End session, return sucess
});

router.post("/deleteuser", (req, res) => {
  //Allow user to delete their account and all their data
  //Maybe go extra and:
  // 1 ASK if they want us to keep data for another time if they come back
  // 2 if NO ask if they want a copy of all their data before deletion, data which they could then export on this or another account
  // 3 confirm full deletion
});
module.exports = router;
export default router;
