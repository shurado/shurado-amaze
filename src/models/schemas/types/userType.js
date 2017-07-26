import { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

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
    image_url: {
      type: GraphQLString
    }
  }
})

export default userType;
