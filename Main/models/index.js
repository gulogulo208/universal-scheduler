const User = require("./User");
const Organization = require("./Organization");
const Division = require("./Division");
const Project = require("./Project");
const Employee = require("./Employee");
const Permissions = require("./Permissions");
const EmployeeAssignments = require("./EmployeeAssignments");

User.hasOne(Permissions, {
  foreignKey: "permission_id",
  onDelete: null,
});

Employee.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Employee.belongsTo(Project, {
    foreignKey: "manager_id", 
})

EmployeeAssignments.belongsToMany(Project, {
    foreignKey: "manager_id"
})

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

Employee.hasOne(Project, {
  through: EmployeeAssignments,
  foreignKey: "employee_id",
});

Employee.hasOne(Division, {
  foreignKey: "division_id",
  onDelete: null,
});

Employee.hasOne(Organization, {
  foreignKey: "organization_id",
  onDelete: null,
});
