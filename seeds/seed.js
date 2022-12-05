const sequelize = require("../config/connection");
const {
  User,
  Project,
  Division,
  Organization,
  Permission,
  Employee,
  EmployeeAssignments,
} = require("../models");

const userData = require("./userData.json");
const projectData = require("./projectData.json");
const permissionData = require("./permissionData.json");
const divisionData = require("./divisionData.json");
const organizationData = require("./organizationData.json");
const employeeData = require("./employeeData.json");
const empAssignmentData = require("./employeeAssignments.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Permission.bulkCreate(permissionData, {
    individualHooks: true,
    returning: true,
  });

  await Organization.bulkCreate(organizationData, {
    individualHooks: true,
    returning: true,
  });

  for (let i = 0; i < userData.length; i++) {
    const newUser = await User.create({
      email: userData[i].email,
      password: userData[i].password,
      permission_id: userData[i].permission_id,
    });

    const newEmployee = await Employee.create({
      first_name: userData[i].first_name,
      last_name: userData[i].last_name,
      position: userData[i].position,
      organization_id: userData[i].organization_id,
      user_id: newUser.id,
    });
  }

  for (const division of divisionData) {
    await Division.create(division);
  }

  for (const project of projectData) {
    await Project.create(project);
  }

  const employeeAssignments = await EmployeeAssignments.bulkCreate(
    empAssignmentData,
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
};

seedDatabase();