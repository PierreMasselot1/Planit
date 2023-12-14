import { Request, Response } from "express";
import { Todo } from "@shared/types/todo_types";
import express from "express";
import knex from "../config/knex";
import { User } from "@shared/types/user_types";
import { Label } from "@shared/types/label_types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user: User = req.user;
  const todolist = await knex("todo_list").where("owner_id", user.id).first();

  var todos: Todo[] = null;
  if (todolist) {
    todos = await knex("todo")
      .where("todo_list_id", todolist.id)
      .where(function () {
        this.whereNull("is_deleted").orWhere("is_deleted", false);
      });
  }

  // get labels for each todo
  todos = await Promise.all(
    todos.map(async (todo: Todo) => {
      const label_ids: number[] = (
        await knex("todo_to_label").where("todo_id", todo.id)
      ).map((todo_to_label) => todo_to_label.label_id);

      const labels: Label[] = await Promise.all(
        label_ids.map(async (label_id): Promise<Label> => {
          return (await knex("label").where("id", label_id).first()) as Label;
        })
      );

      return {
        ...todo,
        labels,
      };
    })
  );

  res.json({ todos });
});

router.get("/labels", async (req: Request<number>, res: Response) => {
  if (!req.query.todo_id) {
    res.status(400).json({ message: "todo_id is required" });
    return;
  }

  const todo_id: number = parseInt(req.query.todo_id as string, 10);

  const label_ids: number[] = (
    await knex("todo_to_label").where("todo_id", todo_id)
  ).map((todo_to_label) => todo_to_label.label_id);

  const labels: Label[] = await Promise.all(
    label_ids.map(async (label_id): Promise<Label> => {
      return (await knex("label").where("id", label_id).first()) as Label;
    })
  );

  res.json({ labels });
});

router.post("/", async (req: Request<Partial<Todo>>, res: Response) => {
  const todo: Partial<Todo> = req.body.todo;

  // Validate fields
  if (!todo.title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const user: User = req.user;
  let todolist = await knex("todo_list").where("owner_id", user.id).first();

  const label_ids: number[] = todo.labels?.map((label) => label.id);

  if (!todolist) {
    const [newTodoList] = await knex("todo_list")
      .insert({ owner_id: user.id })
      .returning("*");
    todolist = newTodoList;
  }

  const db_insert_todo: Partial<Todo> = {
    title: todo.title,
    description: todo.description,
    completed: todo.completed,
    due_date: todo.due_date,
    todo_list_id: todolist.id,
  };

  //get id of just inserted todo
  let todo_id: number;
  await knex("todo")
    .insert(db_insert_todo)
    .returning("id")
    .then((res: { id: number }[]) => {
      todo_id = res[0].id;
    });

  console.log("todo id:", todo_id);
  // Link to label using the todo_to_label table
  if (label_ids) {
    await Promise.all(
      label_ids.map(async (label_id) => {
        console.log("label_id", label_id, ": todo_id", todo_id);
        await knex("todo_to_label").insert({
          todo_id,
          label_id,
        });
      })
    );
  }

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
