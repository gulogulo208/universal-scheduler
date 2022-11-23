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
      div_name: {
        type: dataTypes.STRING,
        allowNull: false,
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