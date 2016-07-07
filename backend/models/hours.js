"use strict";

module.exports = function(sequelize, DataTypes) {
  var hours = sequelize.define("hours", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gym_id: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    time_open: DataTypes.TIME,
    time_close: DataTypes.TIME,
    holiday: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        hours.belongsTo(models.gyms, {
          foreignKey: 'gym_id'
        });    
      }
    }
  });

  return hours;
};