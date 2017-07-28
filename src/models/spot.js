'use strict';
module.exports = function(sequelize, DataTypes) {
  var spot = sequelize.define('spot', {
    location: DataTypes.GEOMETRY,
    name: DataTypes.STRING
  }, {
    timestamps: false
  });

  spot.associate = function(models) {
    spot.belongsToMany(models.feed, { through: 'spots_feeds', foreignKey: 'spot_id',  timestamps: false });
  }

  return spot;
};
