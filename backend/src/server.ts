const express = require("express");
const app = express();

app.use(express.json());
const port = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

const todoRouter = require("./routes/todo");
//map routes
app.use("/api/todo", todoRouter);

app.get("/api/ping", (req, res) => {
  res.json("beep boop");
});
