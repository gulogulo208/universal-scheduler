const { Model, DataTypes } = require("sequelize");

class Division extends Model {};

Division.init(
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
      organization_id: {
          type: DataTypes.INTEGER,
          references: {
              model: 'organization', 
              key: 'id'
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
  
  module.exports = Division;