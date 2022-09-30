const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/test", async (req, res) => {
  console.log("test");
  res.json({ message: "TEST BACKEND ROUTE" });
});

router.post("/", async (req, res) => {
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

module.exports = router;
export default router;
