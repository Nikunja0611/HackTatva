const { DataTypes, Model } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: { 
          type: DataTypes.INTEGER, 
          autoIncrement: true, 
          primaryKey: true 
        },
        name: { 
          type: DataTypes.STRING(255), 
          allowNull: false 
        },
        email: { 
          type: DataTypes.STRING(255), 
          unique: true, 
          allowNull: false 
        },
        passwordHash: { 
          type: DataTypes.STRING(255), 
          allowNull: false 
        },
        role: { 
          type: DataTypes.STRING(50), 
          defaultValue: "participant" 
        }
      },
      { 
        sequelize, 
        modelName: "User",
        tableName: "Users",
        timestamps: true
      }
    );
  }
}

module.exports = User;
