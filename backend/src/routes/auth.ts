import passportLocal from "passport-local";
import { User } from "@shared/types/user_types";
import express from "express";
import { Response } from "express";

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
module.exports = router;
export default router;
