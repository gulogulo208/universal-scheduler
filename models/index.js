const User = require("./User");
const Organization = require("./Organization");
const Division = require("./Division");
const Project = require("./Project");
const Employee = require("./Employee");
const Permission = require("./Permission");
const EmployeeAssignments = require("./EmployeeAssignments");

User.hasOne(Permission, {
	foreignKey: 'permission_id',
	onDelete: null,
});

Employee.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

/* Employee.belongsTo(Project, {
	foreignKey: 'manager_id',
}); */

/* Project.hasOne(Employee, {
	foreignKey: 'manager_id',
}); */

/* Employee.belongsToMany(Project, {
	through: EmployeeAssignments,
	foreignKey: 'employee_id',
	onDelete: null,
});

Project.belongsToMany(Employee, {
	through: EmployeeAssignments,
	foreignKey: 'project_id',
	onDelete: null,
}); */

Employee.belongsTo(Organization, {
	foreignKey: 'organization_id',
	onDelete: null,
});

Organization.hasMany(Division);

Division.belongsTo(Organization, {
	foreignKey: 'organization_id',
});

Division.hasMany(Project, {
	onDelete: 'CASCADE'
});

Project.belongsTo(Division, {
	foreignKey: 'division_id',
});

Employee.belongsTo(Project, {
  	foreignKey: "project_id",
	onDelete: null
});

//Project.hasMany(Employee);

module.exports = {
	User,
	Organization,
	Division,
	Project,
	Employee,
	Permission,
	EmployeeAssignments,
};