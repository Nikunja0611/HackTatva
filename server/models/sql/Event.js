const { DataTypes, Model } = require('sequelize');
class Event extends Model{
  static initModel(sequelize){
    Event.init({
      id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true },
      name:DataTypes.STRING,
      description:DataTypes.TEXT,
      startAt:DataTypes.DATE,
      endAt:DataTypes.DATE,
      tracks:DataTypes.JSON
    },{ sequelize, modelName:'Event' });
  }
}
module.exports = Event;
