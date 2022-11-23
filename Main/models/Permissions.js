const { Model, DataTypes } = require("sequelize");

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
      user_id: {
        type: DataTypes.INTEGER, 
          references: {
              model: 'user', 
              key: 'id'
          },
      },
      organization_id: {
          type: DataTypes.INTEGER, 
          references: {
              model: 'organization', 
              key: 'id'
          },
      },
      role_id: {
        type: DataTypes.INTEGER, 
        references: {
            model: 'role', 
            key: 'id'
        },
    },
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