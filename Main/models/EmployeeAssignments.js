const { Model, DataTypes } = require("sequelize");

class EmployeeAssignments extends Model {};

EmployeeAssignments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'project',
          key: 'id',
        },
      },
      employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'employee',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "division",
    }
  );
  
  module.exports = EmployeeAssignments;