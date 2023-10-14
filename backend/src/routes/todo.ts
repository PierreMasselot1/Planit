import { Request, Response } from "express";
import { Todo } from "@shared/types/todo_types";
import express from "express";
import knex from "../config/knex";
import { User } from "@shared/types/user_types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user: User = req.user;
  const todolist = await knex("todo_list").where("owner_id", user.id).first();

  var todos = null;
  if (todolist) {
    todos = await knex("todo")
      .where("todo_list_id", todolist.id)
      .where(function () {
        this.whereNull("is_deleted").orWhere("is_deleted", false);
      });
  }
  res.json({ todos });
});

router.post("/", async (req: Request<Todo>, res: Response) => {
  const user: User = req.user;
  let todolist = await knex("todo_list").where("owner_id", user.id).first();

  if (!todolist) {
    const [newTodoList] = await knex("todo_list")
      .insert({ owner_id: user.id })
      .returning("*");
    todolist = newTodoList;
  }

  await knex("todo").insert({
    todo_list_id: todolist.id,
    title: req.body.title,
    description: req.body.description,
    due_date: req.body.due_date,
  });
  res.json({ message: "Created a new todo item" });
});

router.delete("/", async (req: Request, res: Response) => {
  await knex("todo").where("id", req.query.id).update("is_deleted", true);
  res.sendStatus(204);
});

router.put("/", async (req: Request, res: Response) => {
  const queryBuilder = knex("todo").where("id", req.query.id);

  if (req.body.title != undefined) {
    queryBuilder.update("title", req.body.title);
  }

  if (req.body.description != undefined) {
    queryBuilder.update("description", req.body.description);
  }

  if (req.body.completed != undefined) {
    queryBuilder.update("completed", req.body.completed);
  }

  if (req.body.due_date != undefined) {
    queryBuilder.update("due_date", req.body.due_date);
  }

  await queryBuilder;
  res.json({ message: "Updated the item" });
});

module.exports = router;
export default router;
