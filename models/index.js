const User = require("./User");
const Organization = require("./Organization");
const Division = require("./Division");
const Project = require("./Project");
const Employee = require("./Employee");
const Permission = require("./Permission");

User.hasOne(Permission, {
	foreignKey: 'permission_id',
	onDelete: null,
});

Employee.belongsTo(User, {
	foreignKey: 'user_id',
	onDelete: 'CASCADE',
});

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

module.exports = {
	User,
	Organization,
	Division,
	Project,
	Employee,
	Permission,
};