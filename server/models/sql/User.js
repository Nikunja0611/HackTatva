const { DataTypes, Model } = require('sequelize');
class User extends Model{
  static initModel(sequelize){
    User.init({
      id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
      name:DataTypes.STRING,
      email:{ type:DataTypes.STRING, unique:true },
      passwordHash:DataTypes.STRING,
      role:{ type:DataTypes.STRING, defaultValue:'participant' }
    },{ sequelize, modelName:'User' });
  }
}
module.exports = User;
