// Imports
const router = require("express").Router();

// Routes
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

// Use Routes
router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
