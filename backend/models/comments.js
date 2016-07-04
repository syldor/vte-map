"use strict";

module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define("comments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gym_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    validated: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        comments.belongsTo(models.gyms, {
          foreignKey: 'gym_id'
        });    
      }
    }
  });

  return comments;
};