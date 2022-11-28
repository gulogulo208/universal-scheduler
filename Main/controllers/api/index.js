// Imports
const router = require("express").Router();

// Routes
const userRoutes = require("./userRoutes");
const divisionRoutes = require("./divisionRoutes");

// Use Routes
router.use("/users", userRoutes);
router.use("/division", divisionRoutes);

module.exports = router;
