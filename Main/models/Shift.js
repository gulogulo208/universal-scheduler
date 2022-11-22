const { Model, DataTypes } = require("sequelize");

class Shift extends Model {}

Shift.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      division_id: {
          type: DataTypes.INTEGER, 
          references: {
              model: 'Division', 
              key: 'id'
          },
      },
      project_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'Project', 
            key: 'id'
        }
      }, 
      shift_start: {
        type: DataTypes.DATETIME, 
        allowNull: true
      }, 
      shift_end: {
        type: DataTypes.DATETIME, 
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "admin",
    }
  );
  
  module.exports = Shift;