const { Employee, Organization, Project, Division } = require("../models");

// Imports
const router = require("express").Router();

// Routes
router.get("/", (req, res) => {
  if (!req.session.logged_in) {
    res.render("home", { logged_in: req.session.logged_in });
  } else {
    res.redirect("/dashboard");
  }
});

// router.get("/login", (req, res) => {
//   res.render("login", { logged_in: req.session.logged_in });
// });

router.get("/signup", (req, res) => {
  res.render("signup", { logged_in: req.session.logged_in });
  return;
});

router.get("/dashboard", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });

    const employee = employeeData.get({ plain: true });
    console.log("EMP_DATA", employee);

    const orgData = await Organization.findOne({
      where: { id: employeeData.organization_id },
    });
    const organization = orgData.get({ plain: true });
    console.log("ORG_DATA", organization);

    const divData = await Division.findAll({
      where: { organization_id: organization.id },
    });
    const division = divData.map((val) => val.get({ plain: true }));
    console.log("DIV_DATA", division);

    const projectData = await Project.findAll();
    const project = projectData.map((val) => val.get({ plain: true }));
    console.log("PROJ_DATA", project);

    res.render("dashboard", {
      layout: "panel",
      organization,
      employee,
      division,
      project,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
