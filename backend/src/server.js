const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
const port = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

//routes
const todoRouter = require("./routes/todo");

//map routes
app.use("/api/caribou", todoRouter);

app.get("/api/ping", (req, res) => {
  res.json("beep boop");
});