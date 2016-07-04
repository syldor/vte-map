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
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        gyms.hasMany(models.comments, {
          foreignKey: 'gym_id'
        });
      }
    }
  });

  return gyms;
};