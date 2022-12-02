const sequelize = require('../config/connection');
const { User, Project, Division, Organization, Permission, Employee, EmployeeAssignments  } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const permissionData = require('./permissionData.json');
const divisionData = require('./divisionData.json');
const organizationData = require('./organizationData.json');
const employeeData = require('./employeeData.json');
const empAssignmentData = require('./employeeAssignments.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const permissions = await Permission.bulkCreate(permissionData, {
        individualHooks: true,
        returning: true
    });

    const organizations = await Organization.bulkCreate(organizationData, {
        individualHooks: true,
        returning: true
    });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    users.map(async (user) => {
        const correspondingEmp = employeeData.filter(employee => employee.user_id === user.id)[0];
        await Employee.create({
            first_name: correspondingEmp.first_name,
            last_name: correspondingEmp.last_name,
            position: correspondingEmp.position,
            user_id: correspondingEmp.user_id,
            organization_id: correspondingEmp.organization_id
        })
    });

    const divisions = await Division.bulkCreate(divisionData, {
        individualHooks: true,
        returning: true
    });
    
    const projects = await Project.bulkCreate(projectData, {
        individualHooks: true,
        returning: true 
    });
    
    const employeeAssignments = await EmployeeAssignments.bulkCreate(empAssignmentData, {
        individualHooks: true,
        returning: true 
    });


    // for (const project of projectData) {
    //     await Project.create({
    //         ...project,
    //         user_id: users[Math.floor(Math.random() * users.length)].id
    //     });
    // }

    process.exit(0);
}


seedDatabase();