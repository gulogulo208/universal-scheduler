const { Model, DataTypes } = require("sequelize");
const sequelize = require('../config/connection');

class Organization extends Model {};

Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      business_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_type: {
        type: DataTypes.STRING,
        allowNull: false
      },
      division_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'division', 
              key: 'id'
          },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "organization",
    }
  );
  
  module.exports = Organization;