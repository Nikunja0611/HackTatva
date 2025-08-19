const { DataTypes, Model } = require('sequelize');

class Score extends Model {
  static initModel(sequelize) {
    Score.init({
      id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
      },
      eventId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      teamId: { 
        type: DataTypes.STRING(255), 
        allowNull: false 
      },
      judgeId: { 
        type: DataTypes.INTEGER,
        allowNull: false
      },
      criteria: { 
        type: DataTypes.TEXT, 
        allowNull: true
      },
      total: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
        defaultValue: 0
      }
    }, { 
      sequelize, 
      modelName: 'Score',
      tableName: 'Scores',
      timestamps: true
    });
  }
}

module.exports = Score;
