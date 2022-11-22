// Imports
const router = require("express").Router();

// Routes
router.get("/", (req, res) => {
  res.send("Homepage");
});

module.exports = router;
