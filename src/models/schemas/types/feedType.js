import { 
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from 'graphql';

import SpotType from './SpotType';
import userType from './userType';
import { comment as Comment } from '../../../models';

const uniq = (array) => {
  return array.reduce((acc, curr) => {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }

    return acc;
  }, [])
}


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

const commentType = new GraphQLObjectType({
  name: 'commentType',
  description: 'comment of a feed',
  fields: {
    user_id: {
      type: GraphQLID
    },
    feed_id: {
      type: GraphQLID
    },
    text: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    user: {
      type: userType,
      resolve: (comment) => comment.getUser()
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
    comment_count: {
      type: GraphQLInt,
      resolve: (feed) => {
        return new Promise(resolve => {
          Comment
            .count({ attributes: ['user_id'], group: ['user_id'], where: { feed_id: feed.id } })
            .then(result => resolve((result[0] && result[0].count) || 0))
        })
      }
    },
    commenter_ids: {
      type: new GraphQLList(GraphQLInt),
      resolve: (feed) => Promise.resolve(
        feed
          .getComments({ attributes: ['user_id'] })
          .then(comments => comments.map(comment => comment.user_id))
          .then(uniq)
      )
    },
    comments: {
      type: new GraphQLList(commentType),
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve: (feed, args) => Promise.resolve(
        feed.getComments({
          limit: args.limit || 3,
          offset: args.offset || 0
        })
      )
    },
    spot: {
      type: SpotType,
      resolve: (feed) => feed.getSpots().then(spots => spots[0])
    },
    author: {
      type: userType,
      resolve: (feed) => Promise.resolve(feed.user)
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

