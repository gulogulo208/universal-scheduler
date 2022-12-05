// Imports
const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { sendInviteEmail } = require("../../utils/sendEmail");
const { User, Employee } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const tempPassword = uuidv4();

    const userData = await User.create({
      email: req.body.email,
      password: tempPassword,
      permission_id: 2,
    });

    const user = userData.get({ plain: true });

    const empData = await Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      position: req.body.position,
      organization_id: req.session.org_id,
      user_id: user.id,
    });

    const employee = empData.get({ plain: true });

    const inviteLink = "http://localhost:3001/";

    sendInviteEmail(employee.first_name, user.email, tempPassword, inviteLink);

    res.send(200);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/edit", async (req, res) => {
  try {
    const updateEmp = await Employee.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
      {
        where: { id: req.session.user_id },
      }
    );

    if (!updateEmp) {
      res.status(400).json({ message: "Couldn't update user information" });
      return;
    }

    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
