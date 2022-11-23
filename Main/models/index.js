const User = require('./User')
const Organization = require('./Organization');
const Division = require('./Division');
const Project = require('./Project');
const Employee = require('./Employee');
const Permission = require('./Permissions');
const EmployeeAssignments = require('./EmployeeAssignments');

User.hasOne(Permissions, {
    foreignKey: "permission_id", 
    onDelete: null
});

Employee.hasOne(User, {
    foreignKey: "user_ud", 
    onDelete: "CASCADE"
});

Employee.hasMany(EmployeeAssignments, {
    foreignKey: "project_id", 
    foreignKey: "project_id",
    onDelete: null
});

Employee.hasOne(Division, {
    foreignKey: "division_id", 
    onDelete: null
});

Employee.hasOne(Organization, {
    foreignKey: "organization_id", 
    onDelete: null
});

Employee.







// Organization.hasMany(Division, {
//     foreignKey: "division_id", 
//     onDelete: 'CASCADE'
// });

// Division.hasOne(Organization, {
//     foreignKey: "organization_id", 
// });

// Division.hasOne(Organization, {
//     foreignKey: "organization_id", 
// });

// Organization.hasMany(Employee, {
//     foreignKey: "organization_id", 
// });

// Employee.hasOne(Organization, {
//     foreignKey: "organization_id",
// });

// Division.hasMany(Project, {
//     foreignKey: "project_id", 
// });

// Project.hasOne(Division, {
//     foreignKey: 'division_id'
// });

// Project.hasMany(Employee, {
//     foreignKey: "employee_id"
// });

// Employee.hasMany(Project, {
//     foreignKey: "project_id"
// });

// Employee.hasOne(Permission, {
//     foreignKey: "permission_id"
// });

// Permission.hasMany(Employee, {
//     foreignKey: "employee_id"
// });

