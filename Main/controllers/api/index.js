// Imports
const router = require("express").Router();

// Routes
const userRoutes = require("./userRoutes");
const divisionRoutes = require("./divisionRoutes");
const projectRoutes = require("./projectRoutes");

// Use Routes
router.use("/users", userRoutes);
router.use("/division", divisionRoutes);
router.use("/project", projectRoutes);

module.exports = router;
