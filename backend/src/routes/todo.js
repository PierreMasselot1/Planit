const express = require("express");
const router = express.Router();

//sign-up
router.post("/test", async (req, res) => {
  //TODO input validation
  res.json = {message:"TEST BACKEND ROUTE"}
});

module.exports = router;