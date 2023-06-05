import { Habit } from "@shared/types/habit_types";
import { Request, Response } from "express";
import express from "express";
import knex from "../config/knex";
import { User } from "@shared/types/user_types";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const user: User = req.user;
  const habitList = await knex("habit_list")
    .where("owner_id", user.id)
    .select("*");

  let habits = [];
  if (habitList.length !== 0) {
    habits = await knex("habit")
      .where("habit_list_id", habitList[0].id)
      .where((builder) =>
        builder.whereNull("is_deleted").orWhere("is_deleted", false)
      )
      .select("*");
  }

  res.json({ habits: habits });
});

router.post("/", async (req: Request<Habit>, res: Response) => {
  const user: User = req.user;
  const habit: Habit = req.body as unknown as Habit;

  let habitList = await knex("habit_list")
    .where("owner_id", user.id)
    .select("*");

  if (habitList.length === 0) {
    habitList = await knex("habit_list")
      .insert({ owner_id: user.id })
      .returning("*");
  }

  await knex("habit").insert({
    habit_list_id: habitList[0].id,
    title: habit.title,
    description: habit.description,
    streak: habit.streak,
    completion_count: habit.completion_count,
  });

  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  const habitId = req.query.id;

  await knex("habit").where("id", habitId).update("is_deleted", true);

  res.status(204).json({ message: "Deleted the item" });
});

router.put("/increment/", async (req: Request, res: Response) => {
  const habitId = req.query.id;

  const habit: Habit = await knex("habit").where("id", habitId).first();
  const completionDate: Date = new Date(req.body.completion_date);

  let lastCompletedDate = null;
  if (habit.completion_dates) {
    lastCompletedDate = new Date(
      habit.completion_dates[habit.completion_dates.length - 1]
    );
  }

  if (
    !lastCompletedDate ||
    (completionDate.toUTCString() !== lastCompletedDate.toUTCString() &&
      completionDate.getUTCDay() - lastCompletedDate.getUTCDay() === 1 &&
      completionDate.getUTCMonth() === lastCompletedDate.getUTCMonth() &&
      completionDate.getUTCFullYear() === lastCompletedDate.getUTCFullYear())
  ) {
    await knex("habit")
      .where("id", habitId)
      .increment("streak", 1)
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error incrementing streak" });
      });
  }

  await knex("habit")
    .where("id", habitId)
    .increment("completion_count", 1)
    .update({
      completion_dates: knex.raw(`array_append(completion_dates, ?)`, [
        completionDate.toISOString(),
      ]),
    })
    .then(() => {
      res.json({ message: "Incremented the habit counter" });
    })
    .catch(() => {
      res.status(500).json({ message: "Error incrementing streak" });
    });
});

export default router;
