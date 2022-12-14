// Imports
const router = require("express").Router();
const { User, Employee, Organization, Permission } = require("../../models");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });
    
    const empData = await Employee.findOne({
      where: { user_id: userData.id },
    });

    if (!userData) {
      res.status(400).json({ message: "Invalid email. Please try again." });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Invalid password. Please try again" });
      return;
    }

    const user = userData.get({ plain: true });
    const employee = empData.get({ plain: true });

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.email = user.email;
      req.session.logged_in = true;
      req.session.org_id = employee.organization_id;

      res.status(200).json({ message: "You are now logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create({
      email: req.body.email,
      password: req.body.password,
      permission_id: 1,
    });

    if (!userData) {
      res.status(400).json({ message: "Couldn't create a new User" });
      return;
    }

    const orgData = await Organization.create({
      title: req.body.title,
      business_type: req.body.type,
    });

    if (!orgData) {
      res.status(400).json({ message: "Couldn't create a new Organization" });
      return;
    }

    const employeeData = await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      position: req.body.position,
      user_id: userData.id,
      organization_id: orgData.id,
    });

    if (!employeeData) {
      res.status(400).json({ message: "Couldn't create a new Employee" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
      req.session.logged_in = true;
      req.session.org_id = orgData.id;
      req.session.permission_id = userData.permission_id;

      res.status(200).json({ message: "You are now signed up logged in" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/changePassword", async (req, res) => {
  try {
    const updatedUser = await User.update(
      {
        password: req.body.new_password,
      },
      {
        where: { id: req.session.user_id },
        individualHooks: true,
      }
    );

    if (!updatedUser) {
      res.status(400).json({ message: "Couldn't change password" });
      return;
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/updateEmail", async (req, res) => {
  try {
    const updateUser = await User.update(
      {
      email: req.body.email,
      },
      {
        where: { id: req.session.user_id },
      }
    );

    if (!updateUser) {
      res.status(400).json({ message: "Couldn't update email" });
    }

    res.status(200).end();

  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
