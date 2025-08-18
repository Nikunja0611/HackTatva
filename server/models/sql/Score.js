const { DataTypes, Model } = require('sequelize');
class Score extends Model{
  static initModel(sequelize){
    Score.init({
      id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
      eventId:DataTypes.INTEGER,
      teamId:DataTypes.STRING,
      judgeId:DataTypes.INTEGER,
      criteria:DataTypes.JSON,
      total:DataTypes.FLOAT
    },{ sequelize, modelName:'Score' });
  }
}
module.exports = Score;
