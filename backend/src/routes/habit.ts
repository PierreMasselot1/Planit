import { Habit } from "@shared/types/habit_types";
import { Request, Response } from "express";

const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const userProfile = req.auth.payload;

  const habitList = await pool.query(
    `SELECT * FROM habit_list 
      WHERE owner_id = '${userProfile.sub.replace("|", "_")}'`
  );

  var habits = null;
  if (habitList.rows.length !== 0) {
    const query = `SELECT * FROM habit where habit_list_id = ${habitList.rows[0].id} AND is_deleted IS NULL OR FALSE`;
    habits = await pool.query(query);
  }
  res.json({ habits: habits?.rows });
});

router.post("/", async (req: Request<Habit>, res: Response) => {
  const userProfile = req.auth.payload;
  const habit: Habit = req.body as unknown as Habit;
  var habitList = await pool.query(
    `SELECT * FROM habit_list 
      WHERE owner_id = '${userProfile.sub.replace("|", "_")}'`
  );

  if (habitList.rows.length === 0) {
    const query = `
        INSERT INTO habit_list (owner_id)
        VALUES ($1)
        RETURNING id
      `;
    const values = [userProfile.sub.replace("|", "_")];
    habitList = await pool.query(query, values);
  }

  const query = `
        INSERT INTO habit (habit_list_id,title, description, streak, completion_count, last_completed)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id
      `;

  if (habitList.rows.length !== 0) {
    const values = [
      habitList.rows[0].id,
      habit.title,
      habit.description,
      habit.completion_count,
      habit.streak,
      habit.last_completed,
    ];
    await pool.query(query, values);
  }
  res.json({ message: "tried to post" });
});

router.delete("/", async (req: Request, res: Response) => {
  const query = `Update habit SET is_deleted = 't' WHERE id = ${req.query.id}`;
  await pool.query(query);
  res.status(204).json({ message: "Deleted the item" });
});

router.put("/increment/", async (req: Request, res: Response) => {
  const habit_id = req.query.id;
  const getStreakQuery = `SELECT streak FROM habit WHERE id = ${habit_id}`;
  let streak = await pool.query(getStreakQuery);

  if (streak.rows[0].streak == undefined) {
    streak = 1;
  } else {
    streak = streak.rows[0].streak + 1;
  }

  const query = `UPDATE habit SET streak = ${streak} WHERE id = ${habit_id}`;
  await pool.query(query);
  res.json({ message: "Incremented the habit counter" });
});

module.exports = router;
export default router;
