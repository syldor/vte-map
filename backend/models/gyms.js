"use strict";

module.exports = function(sequelize, DataTypes) {
  var gyms = sequelize.define("gyms", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    price_month: DataTypes.INTEGER,
    price_6month: DataTypes.INTEGER,
    price_year: DataTypes.INTEGER,
    infos: DataTypes.TEXT,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        gyms.hasMany(models.comments, {
          foreignKey: 'gym_id'
        });
        gyms.hasMany(models.hours, {
          foreignKey: 'gym_id'
        });
      }
    }
  });

  return gyms;
};