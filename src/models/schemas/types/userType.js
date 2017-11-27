const  { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const avatarType = new GraphQLObjectType({
  name: 'avatarType',
  fields: {
    facebook: { type: GraphQLString },
    google: { type: GraphQLString },
  }
})

const userType = new GraphQLObjectType({
  name: 'userType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID), 
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
})

module.exports = userType;
