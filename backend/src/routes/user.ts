import { User } from "@shared/types/user_types";
import express from "express";
import { Response, Request } from "express";

const router = express.Router();

router.get("/", (req: any, res: Response<User | any>) => {
  console.log("yayeet");
  console.log(req.user);
  res.send(req.user);
});

router.get("/logout", (req: any, res) => {
  req.logout();
  res.send("logged out");
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
