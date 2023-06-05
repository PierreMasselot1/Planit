import { User } from "@shared/types/user_types";
import express from "express";
import { Response } from "express";

const router = express.Router();

router.get("/", (req: any, res: Response<User | any>) => {
  res.send(req.user);
});

module.exports = router;
export default router;
