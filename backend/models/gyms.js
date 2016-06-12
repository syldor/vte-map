"use strict";

module.exports = function(sequelize, DataTypes) {
  var gyms = sequelize.define("gyms", {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.INTEGER,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT
  }, {
    timestamps: false,
    classMethods: {
    }
  });

  return gyms;
};