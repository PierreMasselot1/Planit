import { Request, Response } from "express";
const express = require("express");
const app = express();

app.use(express.json());
const port: number = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

const todoRouter = require("./routes/todo");
//map routes
app.use("/api/todo", todoRouter);

app.get("/api/ping", (req: Request, res: Response) => {
  res.json("beep boop");
});
