'use strict';

var _require = require('graphql'),
    GraphQLID = _require.GraphQLID,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLNonNull = _require.GraphQLNonNull;

var avatarType = new GraphQLObjectType({
  name: 'avatarType',
  fields: {
    facebook: { type: GraphQLString },
    google: { type: GraphQLString }
  }
});

var userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    nickname: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    avatar_url: {
      type: avatarType
    },
    website: {
      type: GraphQLString
    }
  }
});

module.exports = userType;
//# sourceMappingURL=userType.js.map