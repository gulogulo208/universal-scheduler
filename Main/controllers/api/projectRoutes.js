const router = require("express").Router();
const { Project, Division, Employee } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const projectData = await Project.create({
      project_name: req.body.project_name,
      description: req.body.description,
      due_date: req.body.due_date,
      division_id: req.body.div_id,
    });

    if (!projectData) {
      res.status(400).json({ message: "Couldn't create new Project" });
      return;
    }

    res.status(200).json({message: "Project created successfully"})
    
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;