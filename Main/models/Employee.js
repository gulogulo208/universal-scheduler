const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Employee extends Model {}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "project",
        key: "manager_id",
      },
    },
    is_manager: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    division_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "division",
        key: "id",
      },
    },
    organization_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "organization",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "project",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "employee",
  }
);

module.exports = Employee;
