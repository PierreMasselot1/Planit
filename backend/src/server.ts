import express from "express"

const express = require("express")
const app = express();

app.use(express.json());
const port = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

import { Expression } from "typescript";
//routes
import * as todoRouter from "./routes/todo";

//map routes
app.use("/api/todo", todoRouter);

app.get("/api/ping", (req : express.req, res :express.res) => {
  res.json("beep boop");
});