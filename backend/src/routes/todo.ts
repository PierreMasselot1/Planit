import { Request, Response } from "express";
import { Todo } from "@shared/types/todo_types";

const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const userProfile = req.auth.payload;

  const todolist = await pool.query(
    `SELECT * FROM todo_list 
    WHERE owner_id = '${userProfile.sub.replace("|", "_")}'`
  );

  var todos = null;
  if (todolist.rows.length !== 0) {
    const query = `SELECT * FROM todo where todo_list_id = ${todolist.rows[0].id} AND is_deleted IS NULL OR FALSE`;
    todos = await pool.query(query);
  }
  res.json({ todos: todos?.rows });
});

router.post("/", async (req: Request<Todo>, res: Response) => {
  const userProfile = req.auth.payload;
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

  if (todolist.rows.length !== 0) {
    const values = [todolist.rows[0].id, req.body.title, req.body.description];
    await pool.query(query, values);
  }
  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  const query = `Update todo SET is_deleted = 't' WHERE id = ${req.query.id}`;
  await pool.query(query);
  res.statusCode = 204;
  res.json({ message: "Deleted the item" });
});

module.exports = router;
export default router;
