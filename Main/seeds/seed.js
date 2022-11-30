const sequelize = require('../config/connection');
const { User, Project, Division, Organization, Permission, Employee  } = require('../models');

const userData = require('./userData.json');
const projectData = require('./projectData.json');
const permissionData = require('./permissionData.json');
const divisionData = require('./divisionData.json');
const organizationData = require('./organizationData.json');
const employeeData = require('./employeeData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    const permissions = await Permission.bulkCreate(permissionData, {
        individualHooks: true,
        returning: true
    });
    
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const organizations = await Organization.bulkCreate(organizationData, {
        individualHooks: true,
        returning: true
    });
    
    const employees = await Employee.bulkCreate(employeeData, {
        individualHooks: true,
        returning: true 
    });

    const divisions = await Division.bulkCreate(divisionData, {
        individualHooks: true,
        returning: true
    });

    const projects = await Project.bulkCreate(projectData, {
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