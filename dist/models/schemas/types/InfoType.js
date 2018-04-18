'use strict';

var _require = require('graphql'),
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLInt = _require.GraphQLInt;

var InfoType = new GraphQLObjectType({
  name: 'InfoType',
  description: 'count user information',
  fields: {
    feed_count: {
      type: GraphQLInt,
      resolve: function resolve(result) {
        return Promise.resolve(result[0].count);
      }
    },
    suggestion_count: {
      type: GraphQLInt,
      resolve: function resolve(result) {
        return Promise.resolve(result[1].count);
      }
    }
  }
});

module.exports = InfoType;
//# sourceMappingURL=InfoType.js.map