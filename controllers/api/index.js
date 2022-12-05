// Imports
const router = require("express").Router();

// Routes
const userRoutes = require("./userRoutes");
const divisionRoutes = require("./divisionRoutes");
const projectRoutes = require("./projectRoutes");
const employeeRoutes = require("./employeeRoutes");

// Use Routes
router.use("/users", userRoutes);
router.use("/division", divisionRoutes);
router.use("/project", projectRoutes);
router.use("/employee", employeeRoutes);

module.exports = router;
