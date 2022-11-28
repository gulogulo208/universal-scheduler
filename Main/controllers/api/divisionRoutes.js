// Imports
const router = require("express").Router();
const { Division } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const divData = await Division.create({
      div_name: req.body.div_name,
    });

    if (!divData) {
      res.status(400).json({ message: "Couldn't create new Division" });
      return;
    }
    
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
