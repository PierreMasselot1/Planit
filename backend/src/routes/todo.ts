import express from "express";

const express = require("express");
const pool = require("../config/db");

const router: express.Router = express.Router();

router.get("/test", async (req, res) => {
  console.log("test");
  res.json({ message: "TEST BACKEND ROUTE" });
});

router.post("/", async (req, res) => {
  
  
  
  
  const text = `
      INSERT INTO todo (id, message, description)
      VALUES ($1, $2, $3)
      RETURNING id
    `;
  const values = [1, "message", "description"];
  res = pool.query(text, values);

  res.json({ message: "tried to post"});
});

module.exports = router;
export default router;
