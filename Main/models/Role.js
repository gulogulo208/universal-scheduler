const { Model, DataTypes } = require("sequelize");

Role.init(
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
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "admin",
    }
  );
  
  module.exports = Role;