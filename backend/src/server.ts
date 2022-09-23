import express from "express";
const app = express();

app.use(express.json());
const port = 5055;

app.listen(port, console.log(`Listening on port ${port}`));

//routes
import todoRouter from "./routes/todo";

//map routes
app.use("/api/todo", todoRouter);

app.get("/api/ping", (req, res) => {
  res.json("beep boop");
});