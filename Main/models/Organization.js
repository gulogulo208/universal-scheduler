const { Model, DataTypes } = require("sequelize");

class Organization extends Model {};

Organization.init(
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