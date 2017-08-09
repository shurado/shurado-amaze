'use strict';
module.exports = function(sequelize, DataTypes) {
  var spot = sequelize.define('spot', {
    location: DataTypes.GEOMETRY('POINT'),
    name: DataTypes.STRING
  }, {
    timestamps: false
  });

  spot.associate = function(models) {
    spot.belongsToMany(models.feed, { through: 'spots_feeds', foreignKey: 'spot_id',  timestamps: false });
  }

  spot.prototype.addLocation = function({ x, y, name}) {
    return spot.create({
      name,
      location: {
        type: 'Point',
        coordinates: [x, y]
      }
    })
  }

  return spot;
};
