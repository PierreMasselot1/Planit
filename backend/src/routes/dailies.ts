import { Dailies } from "@shared/types/dailies_types";
import { Request, Response } from "express";
import express from "express";
import knex from "../config/knex";
import { User } from "@shared/types/user_types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user: User = req.user;

  const dailiesList = await knex("dailies_list")
    .where("owner_id", user.id)
    .select("*");

  let dailiesArray = [];
  if (dailiesList.length !== 0) {
    dailiesArray = await knex("dailies")
      .where("dailies_list_id", dailiesList[0].id)
      .where((builder) =>
        builder.whereNull("is_deleted").orWhere("is_deleted", false)
      )
      .select("*");
  }

  res.json({ dailiesArray: dailiesArray });
});

router.post("/", async (req: Request<Dailies>, res: Response) => {
  const user: User = req.user;
  const dailies: Dailies = req.body as unknown as Dailies;

  let dailiesList = await knex("dailies_list")
    .where("owner_id", user.id)
    .select("*");

  if (dailiesList.length === 0) {
    dailiesList = await knex("dailies_list")
      .insert({ owner_id: user.id })
      .returning("*");
  }

  await knex("dailies").insert({
    dailies_list_id: dailiesList[0].id,
    title: dailies.title,
    description: dailies.description,
    streak: dailies.streak,
    completion_count: dailies.completion_count,
  });

  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  const dailiesId = req.query.id;

  await knex("dailies").where("id", dailiesId).update("is_deleted", true);

  res.status(204).json({ message: "Deleted the item" });
});

router.put("/increment/", async (req: Request, res: Response) => {
  const dailiesId = req.query.id;

  const dailies: Dailies = await knex("dailies").where("id", dailiesId).first();
  const completionDate: Date = new Date(req.body.completion_date);

  let lastCompletedDate = null;
  if (dailies.completion_dates) {
    lastCompletedDate = new Date(
      dailies.completion_dates[dailies.completion_dates.length - 1]
    );
  }

  if (
    !lastCompletedDate ||
    (completionDate.toUTCString() !== lastCompletedDate.toUTCString() &&
      completionDate.getUTCDay() - lastCompletedDate.getUTCDay() === 1 &&
      completionDate.getUTCMonth() === lastCompletedDate.getUTCMonth() &&
      completionDate.getUTCFullYear() === lastCompletedDate.getUTCFullYear())
  ) {
    await knex("dailies")
      .where("id", dailiesId)
      .increment("streak", 1)
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error incrementing streak" });
      });
  }

  await knex("dailies")
    .where("id", dailiesId)
    .increment("completion_count", 1)
    .update({
      completion_dates: knex.raw(`array_append(completion_dates, ?)`, [
        completionDate.toISOString(),
      ]),
    })
    .then(() => {
      res.json({ message: "Incremented the dailies counter" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error incrementing streak" });
    });
});

export default router;
