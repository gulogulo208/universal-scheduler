const User = require("./User");
const Organization = require("./Organization");
const Division = require("./Division");
const Project = require("./Project");
const Employee = require("./Employee");
const Permission = require("./Permission");
const EmployeeAssignments = require("./EmployeeAssignments");

User.hasOne(Permission, {
  foreignKey: "permission_id",
  onDelete: null,
});

Employee.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Employee.belongsTo(Project, {
//   foreignKey: "manager_id",
// });

Project.hasOne(Employee, {
  foreignKey: "manager_id",
});

Employee.belongsToMany(Project, {
  through: EmployeeAssignments,
  foreignKey: "project_id",
  onDelete: null,
});

Project.belongsToMany(Employee, {
  through: EmployeeAssignments,
  foreignKey: "employee_id",
  onDelete: null,
});

// Employee.hasOne(Project, {
//   through: EmployeeAssignments,
//   foreignKey: "employee_id",
// });

Employee.hasOne(Organization, {
  foreignKey: "organization_id",
  onDelete: null,
});

// Organization has many Divisions
Organization.hasMany(Division);

// Division belongs to Organization
Division.belongsTo(Organization, {
  foreignKey: "organization_id",
});

Project.belongsTo(Division, {
  foreignKey: "division_id",
});

Employee.hasOne(Project, {
  foreignKey: "project_id",
});

module.exports = {
  User,
  Organization,
  Division,
  Project,
  Employee,
  Permission,
  EmployeeAssignments,
};
