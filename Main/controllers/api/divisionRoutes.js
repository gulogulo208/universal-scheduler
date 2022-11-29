// Imports
const router = require("express").Router();
const { Division } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const divData = await Division.create({
      div_name: req.body.div_name,
      organization_id: req.session.org_id,
    });

    if (!divData) {
      res.status(400).json({ message: "Couldn't create new Division" });
      return;
    }

    res.status(200).json({ message: "Division created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
