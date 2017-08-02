import { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import userType from './userType';

const imageType = new GraphQLObjectType({
  name: 'imageType',
  description: 'image url',
  fields: {
    hd: {
      type: GraphQLString
    },
    normal: {
      type: GraphQLString
    }
  }
})

export const feedType = new GraphQLObjectType({
  name: 'feedType',
  description: '使用者動態',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    caption: {
      type: GraphQLString
    },
    image_url: {
      type: imageType
    },
    author: {
      type: userType,
      resolve: (feed) => new Promise(resolve => {
        resolve(feed.user);
      })
    },
    createdAt: {
      type: GraphQLString,
    },
    updatedAt: {
      type: GraphQLString,
    }
  }
});

export const feedById = new GraphQLObjectType({
  name: 'FeedById', 
  description: 'feed by id',
  fields: {
    feed: {
      type: feedType,
      args: {
        id: {
          type: GraphQLID
        }
      }
    }    
  }
});

