const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    project_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    /* manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employee",
        key: "id",
      },
    }, */
    division_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "division",
        key: "id",
      },
    },
  },
  {
    sequelize,
    //timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "project",
    //createdAt: true,
    //updatedAt: true,
  }
);

module.exports = Project;
