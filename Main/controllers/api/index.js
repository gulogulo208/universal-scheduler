// Imports
const router = require("express").Router();

// Routes
const userRoutes = require("./userRoutes");

// Use Routes
router.use("/users", userRoutes);

module.exports = router;
