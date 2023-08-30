import { User } from "@shared/types/user_types";
import { Request, Response } from "express";
import express from "express";
import knex from "../config/knex";
import { Label } from "@shared/types/label_types";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user: User = req.user;
  const labels = await knex("label").where("owner_id", user.id);
  res.json({ labels });
});

router.get("/todo", async (req: Request, res: Response) => {
  const label_ids: number[] = await knex("label_todo_map")
    .where("todo_id", req.query.id)
    .select("label_id")
    .pluck("label_id");
  const labels: Label[] = await Promise.all(
    label_ids.map(async (label_id): Promise<Label> => {
      return (await knex("label").where("id", label_id).first()) as Label;
    })
  );
  res.json({ labels });
});

router.post("/", async (req: Request, res: Response) => {
  const user: User = req.user;
  await knex("label").insert({
    owner_id: user.id,
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
  });
  res.status(201).json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  await knex("label").where("id", req.query.id).del();
  res.sendStatus(204);
});

router.put("/", async (req: Request, res: Response) => {
  const queryBuilder = knex("label").where("id", req.query.id);

  if (req.body.title != undefined) {
    queryBuilder.update("title", req.body.title);
  }

  if (req.body.description != undefined) {
    queryBuilder.update("description", req.body.description);
  }

  if (req.body.color != undefined) {
    queryBuilder.update("color", req.body.color);
  }

  res.sendStatus(204);
});

export default router;
