import { Request, Response } from "express";
import { Todo } from "@shared/types/todo_types";

const express = require("express");
const pool = require("../config/db");
const router = express.Router();

const AuthenticationClient = require("auth0").AuthenticationClient;
const auth0 = new AuthenticationClient({
  domain: "dev-hfnpcabx1n3viyfj.us.auth0.com",
  clientId: "WAOa9Dt62cQtYmvlDdclW4coP9fW5Iup",
});

router.get("/test", async (req, res) => {
  console.log("test");
  res.json({ message: "TEST BACKEND ROUTE" });
});

router.get("/", async (req: Request, res: Response) => {
  console.log("Getting todos");
  const token = req.headers.authorization.split(" ")[1];
  const userProfile = await auth0.getProfile(token);
  const query = `SELECT * FROM todo where is_deleted IS NULL OR FALSE`;
  const todos = await pool.query(query);
  res.json({ todos: todos.rows });
});

router.post("/", async (req: Request<Todo>, res: Response) => {
  const token = req.headers.authorization.split(" ")[1];
  const userProfile = await auth0.getProfile(token);
  var todolist = await pool.query(
    `SELECT * FROM todo_list 
    WHERE owner_id = '${userProfile.sub.replace("|", "_")}'`
  );

  if (todolist.rows.length === 0) {
    const query = `
      INSERT INTO todo_list (owner_id)
      VALUES ($1)
      RETURNING id
    `;
    const values = [userProfile.sub.replace("|", "_")];
    todolist = await pool.query(query, values);
  }

  const query = `
      INSERT INTO todo (todo_list_id,title, description)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
  const values = [todolist.rows[0].id, req.query.title, req.query.description];
  await pool.query(query, values);

  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  console.log("deleting todo");
  const query = `Update todo SET is_deleted = 't' WHERE id = ${req.query.id}`;
  await pool.query(query);
  res.statusCode = 204;
  res.json({ message: "Deleted the item" });
});

module.exports = router;
export default router;
