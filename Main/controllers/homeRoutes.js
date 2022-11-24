const { Employee } = require("../models");

// Imports
const router = require("express").Router();

// Routes
router.get("/", (req, res) => {
  res.render("home", { logged_in: req.session.logged_in });
});

router.get("/login", (req, res) => {
  res.render("login", { logged_in: req.session.logged_in });
});

router.get("/signup", (req, res) => {
  res.render("signup", { logged_in: req.session.logged_in });
});

router.get("/dashboard", async (req, res) => {
  try {
    const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });

    const employee = employeeData.get({ plain: true });

    res.render("dashboard", { employee, logged_in: req.session.logged_in });
  } catch (error) {}
});

module.exports = router;
