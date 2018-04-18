'use strict';

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString;

var SpotType = new GraphQLObjectType({
  name: 'SpotType',
  description: 'user feed spot. 打卡地點',
  fields: {
    name: {
      type: GraphQLString
    },
    location: {
      type: new GraphQLObjectType({
        name: 'LocationType',
        fields: {
          lat: {
            type: GraphQLString,
            resolve: function resolve(location) {
              return location.coordinates[0];
            }
          },
          lng: {
            type: GraphQLString,
            resolve: function resolve(location) {
              return location.coordinates[1];
            }
          }

        }
      })
    }
  }
});

module.exports = SpotType;
//# sourceMappingURL=SpotType.js.map