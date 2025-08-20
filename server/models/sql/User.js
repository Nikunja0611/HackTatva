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
        },
        // Additional fields from signup form
        phone: {
          type: DataTypes.STRING(20),
          allowNull: true
        },
        college: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        skills: {
          type: DataTypes.TEXT,
          allowNull: true,
          comment: 'JSON string of skills array'
        },
        experience: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        github: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        linkedin: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        portfolio: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        resumeUrl: {
          type: DataTypes.STRING(500),
          allowNull: true,
          comment: 'Azure Blob URL for resume file'
        },
        resumeFileName: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        // Social auth fields
        googleId: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        githubId: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        avatar: {
          type: DataTypes.STRING(500),
          allowNull: true
        },
        // Email verification and password reset
        isEmailVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        emailVerificationToken: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        resetPasswordToken: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        resetPasswordExpires: {
          type: DataTypes.DATE,
          allowNull: true
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
