const { DataTypes, Model } = require('sequelize');

class Event extends Model {
  static initModel(sequelize) {
    Event.init({
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      name: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
      },
      startAt: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      endAt: { 
        type: DataTypes.DATE, 
        allowNull: false 
      },
      tracks: { 
        type: DataTypes.TEXT, 
        allowNull: true
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, { 
      sequelize, 
      modelName: 'Event',
      tableName: 'Events',
      timestamps: true
    });
  }
}

module.exports = Event;
