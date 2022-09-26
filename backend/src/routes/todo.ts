import express from "express";

const express = require("express");

const router: express.Router = express.Router();

router.get("/test", async (req, res) => {
  console.log("test");
  res.json({ message: "TEST BACKEND ROUTE" });
});

router.post("/", async (req, res) => {
  res.json({ message: "tried to post" });
});

module.exports = router;
export default router;
