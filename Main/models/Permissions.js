const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Permission extends Model {};

//userID, organizatonID, roleID

Permission.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      access_level: {
        type: DataTypes.INTEGER, 
        defaultValue: 1
      }
      },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "permission",
    }
  );
  
  module.exports = Permission;