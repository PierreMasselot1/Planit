import passportLocal from "passport-local";
import { User } from "@shared/types/user_types";
import express from "express";
import { Response } from "express";
import knex from "knex";

const router = express.Router();
const LocalStrategy = passportLocal.Strategy;

router.post("/login", (req, res: Response<User | any>) => {
  const name = req.body.name;
  const password = req.body.password;

  console.log("User trying to login");
  console.log("name: " + name);
  console.log("password: " + password);

  res.json({ message: "tried to login" });
});

router.post("/register", (req, res: Response<User | any>) => {
  console.log("register endpoint");
  const name = req?.body.name // at this time this can be either the email or the username, might be a good idea to split up with undefined options
  const password = req?.body.name

  //Establish whether name is a username or an email
  

  if (!name || !password || typeof name !== "string" || typeof password !== "string") {
    res.send("Improper Values");
    return;
  }

  knex("user").where("username",name)

  //TODO implement register with passport and password hashing
  //Ideally hash and salt password on client then again on server
  //Challenge based login? for now just being "safe" db side is
  //Gonna have to be enough
});

router.post("/user", (req, res: Response<User | any>) => {
  //RETURN USER
});

router.post("/logout",(req,res)=>{
  //End session, return sucess
})

router.post("/deleteuser",(req,res)=>{
  //Allow user to delete their account and all their data
  //Maybe go extra and:
  // 1 ASK if they want us to keep data for another time if they come back
  // 2 if NO ask if they want a copy of all their data before deletion, data which they could then export on this or another account
  // 3 confirm full deletion
})
module.exports = router;
export default router;
