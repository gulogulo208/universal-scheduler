const {
  Employee,
  Organization,
  Project,
  Division,
  Permission,
  User,
  EmployeeAssignments,
} = require("../models");

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
    console.log('top of dashboard')

    //find employee via logged in user data
    const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });
    
    //serialize employee data
    const employee = employeeData.get({ plain: true });
    console.log("EMP_DATA", employee);

    // find the sessions user
    const userData = await User.findOne({
      where: {id: req.session.user_id}
    });

    //serialize userData
    const user = userData.get({ plain: true });


    // find permissions of current user
    const userPermission = await Permission.findOne({
      where: { id: user.permission_id}
    })

    console.log("userPermission", userPermission)

    //serialize permission data
    const permission = userPermission.get({ plain: true });
    console.log('permission', permission)
    const accessLevel = permission.access_level
    console.log("accessLevel", accessLevel)

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

    console.log("DIVISION", division[0]);

    const scratch = [];
    const project = [];

    for (let i = 0; i < division.length; i++) {
      const tempProjectData = await Project.findAll({
        where: { division_id: division[i].id },
        attributes: [
          'id',
          'project_name',
          'description',
          'division_id',
          'due_date',
          'createdAt'
        ],
        order: [['createdAt', 'ASC']],
        include: [
          {
            model: Division,
          }
        ]
      });

      const temp = tempProjectData.map((val) => val.get({ plain: true }));

      //console.log("TEMP_PROJ", temp);
      scratch.push(temp);
    }

    for (let i = 0; i < scratch.length; i++) {
      for (let j = 0; j < scratch[i].length; j++) {
        project.push(scratch[i][j]);
      }
    }

    console.log("PROJ_DATA", project);

    res.render("dashboard", {
      layout: "panel",
      organization,
      employee,
      division,
      project,
      accessLevel,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/project/:id", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
     //find employee via logged in user data
     const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });

    //serialize employee data
    const employee = employeeData.get({ plain: true });

    const projectData = await Project.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'project_name',
        'description',
        'due_date',
        'manager_id',
        'division_id',
        'createdAt',
      ],
        include: [
        {
          model: Employee,
        }
      ], 
    });

    if (!projectData) {
      res.status(400).json({ message: "Unable to retrieve project Data" });
    }

    const project = projectData.get({ plain: true });

    console.log("PROJ_DATA", project)

    const employeesData = await Employee.findAll({
      where: {
        project_id: req.params.id,
      },
      attributes: [
        'id',
        'project_id',
      ],
      /* include: [
        {
          model: Employee,
        }
      ], */
    });

    console.log("employeesData", employeesData)

    const employees = employeesData.map((val) => val.get({ plain: true }));

    //console.log("assignments", assignments)

    res.render("project", {
      layout: 'panel',
      project,
      //assignments,
      employee,
      employees,
      logged_in: req.session.logged_in,
    })
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/projects', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    console.log('top of dashboard')

    //find employee via logged in user data
    const employeeData = await Employee.findAll({
      where: { organization_id: req.session.org_id },
    });
    
    //serialize employee data
    const employee = employeeData.map((emp) => emp.get({ plain: true }));
    console.log("EMP_DATA", employee);

    // find the sessions user
    const userData = await User.findOne({
      where: {id: req.session.user_id}
    });

    //serialize userData
    const user = userData.get({ plain: true });


    // find permissions of current user
    const userPermission = await Permission.findOne({
      where: { id: user.permission_id}
    })

    console.log("userPermission", userPermission)

    //serialize permission data
    const permission = userPermission.get({ plain: true });
    console.log('permission', permission)
    const accessLevel = permission.access_level
    console.log("accessLevel", accessLevel)

    const orgData = await Organization.findOne({
      where: { id: req.session.org_id },
    });
    const organization = orgData.get({ plain: true });
    console.log("ORG_DATA", organization);

    const divData = await Division.findAll({
      where: { organization_id: organization.id },
    });
    const division = divData.map((val) => val.get({ plain: true }));
    console.log("DIV_DATA", division);

    console.log("DIVISION", division[0]);

    const scratch = [];
    const project = [];

    for (let i = 0; i < division.length; i++) {
      const tempProjectData = await Project.findAll({
        where: { division_id: division[i].id },
        attributes: [
          'id',
          'project_name',
          'description',
          'division_id',
          'due_date',
          'createdAt'
        ],
        include: [
          {
            model: Division,
          }
        ]
      });

      const temp = tempProjectData.map((val) => val.get({ plain: true }));

      //console.log("TEMP_PROJ", temp);
      scratch.push(temp);
    }

    for (let i = 0; i < scratch.length; i++) {
      for (let j = 0; j < scratch[i].length; j++) {
        project.push(scratch[i][j]);
      }
    }

    console.log("PROJ_DATA", project);

    res.render("projects", {
      layout: "panel",
      organization,
      user,
      employee,
      division,
      project,
      accessLevel,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/team', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    console.log('top of dashboard')

    //find employee via logged in user data
    const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });
    
    //serialize employee data
    const employee = employeeData.get({ plain: true });
    console.log("EMP_DATA", employee);

    // find the sessions user
    const userData = await User.findOne({
      where: {id: req.session.user_id}
    });

    //serialize userData
    const user = userData.get({ plain: true });


    // find permissions of current user
    const userPermission = await Permission.findOne({
      where: { id: user.permission_id}
    })

    console.log("userPermission", userPermission)

    //serialize permission data
    const permission = userPermission.get({ plain: true });
    console.log('permission', permission)
    const accessLevel = permission.access_level
    console.log("accessLevel", accessLevel)

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

    console.log("DIVISION", division[0]);

    const scratch = [];
    const project = [];

    for (let i = 0; i < division.length; i++) {
      const tempProjectData = await Project.findAll({
        where: { division_id: division[i].id },
        attributes: [
          'id',
          'project_name',
          'description',
          'division_id',
          'due_date',
          'createdAt'
        ],
        include: [
          {
            model: Division,
          }
        ]
      });

      const temp = tempProjectData.map((val) => val.get({ plain: true }));

      //console.log("TEMP_PROJ", temp);
      scratch.push(temp);
    }

    for (let i = 0; i < scratch.length; i++) {
      for (let j = 0; j < scratch[i].length; j++) {
        project.push(scratch[i][j]);
      }
    };
    console.log("PROJ_DATA", project);

    const staff = await Employee.findAll({
      where: {organization_id: req.session.org_id}, 
      include: [
        {
          model: User, Project, Division, EmployeeAssignments
        }
      ]
    });

    console.log("staff", staff)

    const myStaff = staff.map((val) => val.get({plain: true}))

    console.log("myStaff", myStaff)


    res.render("team", {
      layout: "panel",
      organization,
      employee,
      division,
      project,
      accessLevel,
      myStaff,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

router.get('/profile', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect("/");
      return;
    }
    console.log('top of dashboard')

    //find employee via logged in user data
    const employeeData = await Employee.findOne({
      where: { id: req.session.user_id },
    });
    
    //serialize employee data
    const employee = employeeData.get({ plain: true });
    console.log("EMP_DATA", employee);

    // find the sessions user
    const userData = await User.findOne({
      where: {id: req.session.user_id}
    });

    //serialize userData
    const user = userData.get({ plain: true });


    // find permissions of current user
    const userPermission = await Permission.findOne({
      where: { id: user.permission_id}
    })

    console.log("userPermission", userPermission)

    //serialize permission data
    const permission = userPermission.get({ plain: true });
    console.log('permission', permission)
    const accessLevel = permission.access_level
    console.log("accessLevel", accessLevel)

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

    console.log("DIVISION", division[0]);

    const scratch = [];
    const project = [];

    for (let i = 0; i < division.length; i++) {
      const tempProjectData = await Project.findAll({
        where: { division_id: division[i].id },
        attributes: [
          'id',
          'project_name',
          'description',
          'division_id',
          'due_date',
          'createdAt'
        ],
        include: [
          {
            model: Division,
          }
        ]
      });

      const temp = tempProjectData.map((val) => val.get({ plain: true }));

      //console.log("TEMP_PROJ", temp);
      scratch.push(temp);
    }

    for (let i = 0; i < scratch.length; i++) {
      for (let j = 0; j < scratch[i].length; j++) {
        project.push(scratch[i][j]);
      }
    }

    // const staff = Employee.findAll({
    //   where: {id: employeeData.organization_id}
    // });

    // const myStaff = staff.map((val) => val.get({plain: true}))

    // console.log(myStaff)

    console.log("PROJ_DATA", project);

    res.render("profile", {
      layout: "panel",
      organization,
      employee,
      division,
      project,
      accessLevel,
      // myStaff,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
