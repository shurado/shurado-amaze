const { 
  GraphQLObjectType,
  GraphQLInt,
} = require('graphql');

const InfoType = new GraphQLObjectType({
  name: 'InfoType',
  description: 'count user information',
  fields: {
    feed_count: {
      type: GraphQLInt,
      resolve: (result) => Promise.resolve(result[0].count)
    },
    suggestion_count: {
      type: GraphQLInt,
      resolve: (result) => Promise.resolve(result[1].count)
    }
  }
})

module.exports = InfoType;
