// Imports
const router = require("express").Router();

// Routes
router.get("/", (req, res) => {
  res.render("home");
});

module.exports = router;
