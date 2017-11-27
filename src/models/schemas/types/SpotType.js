const { 
  GraphQLObjectType,
  GraphQLString,
} = require('graphql');

const SpotType = new GraphQLObjectType({
  name: 'SpotType',
  description: 'user feed spot. 打卡地點',
  fields: {
    name: {
      type: GraphQLString,
    },
    location: {
      type: new GraphQLObjectType({
        name: 'LocationType',
        fields: {
          lat: {
            type: GraphQLString,
            resolve: (location) => location.coordinates[0]
          },
          lng: {
            type: GraphQLString, 
            resolve: (location) => location.coordinates[1]
          }

        }
      })
    },
  }
})

module.exports = SpotType;

