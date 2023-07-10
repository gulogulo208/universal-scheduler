const router = require("express").Router();
const { Project, Division, Employee, EmployeeAssignments } = require("../../models");

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

    res.status(200).json({ message: "Project created successfully" });

  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/projects", async (req, res) => {
  try {
    // const projectData = await Project.findAll({
    //   where: {id: req.}
    // })
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/assign', async (req, res) => {
  try {
    // const assignNewEmployee = await EmployeeAssignments.create({
    //   employee_id: req.body.empId, 
    //   project_id: req.body.projId
    // })

    const changeEmpProj = await Employee.update(
      {
        project_id: req.body.projId
      },
      {
      where: {id: req.body.empId}
    }
    )
    // editEmpAssignment = await Employee.post({

    // })
    res.status(200).json({message: "Employee assigned succesfully!"})
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;