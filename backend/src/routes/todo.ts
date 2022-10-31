import { Request, Response } from "express";
const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/test", async (req, res) => {
  console.log("test");
  res.json({ message: "TEST BACKEND ROUTE" });
});

router.get("/", async (req: Request, res: Response) => {
  console.log("Getting todos");
  const query = `SELECT * FROM todo where is_deleted IS NULL OR FALSE`;
  const todos = await pool.query(query);
  res.json({ todos: todos.rows });
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.query);
  const query = `
      INSERT INTO todo (todo_list_id,title, description)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
  const values = [1, req.query.title, req.query.description];
  await pool.query(query, values);

  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  console.log("deleting todo");
  const query = `Update todo SET is_deleted = 't' WHERE id = ${req.query.id}`;
  await pool.query(query);

});

module.exports = router;
export default router;
