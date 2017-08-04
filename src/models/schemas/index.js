import { 
  graphql,
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';

import { feedType } from './types/feedType';
import userType from './types/userType';
import InfoType from './types/InfoType';

import createFeed from './mutations/createFeed';

import { feed as Feed, user as User, comment as Comment } from '../../models/';

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    user: {
      type: userType,
      args: {
        userId: {
          type: new GraphQLNonNull(GraphQLID)
        }
      }
    },
    info: {
      type: InfoType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) } 
      },
      resolve: (_, args) => {
        return Promise.all([
          Feed.findAndCountAll({ where: { user_id: args.userId }, attributes: ['id'] }),
          Comment.findAndCountAll({ where: { user_id: args.userId }, attributes: ['id'] })
        ])
      }
    },
    feeds: {
      type: new GraphQLList(feedType),
      args: {
        offset: { type: GraphQLInt },
      },
      resolve: (_, args) => Feed.findAll({ limit: Feed.FEEDS_LIMIT, include: ['user'], offset: args.offset, order: [['createdAt', 'DESC']] })
    },
    feed: {
      type: feedType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: (_, args) => new Promise(resolve => {
        Feed.findById(args.id, { include: ['user'] }).then(resolve);
      })
    },
    userFeeds: {
      type: new GraphQLList(feedType),
      args: {
        user_id: { type: GraphQLID }
      },
      resolve: (_, { user_id }) => Promise.resolve(Feed.findAll({ where: { user_id } }))
    }
  }
});

/**
 * [mutation description]
 * @type {GraphQLObjectType}
 *
 * - createFeed
 * - removeFeed
 * - editFeed
 * 
 * - createUser
 * - removeUser
 * 
 */
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation Object',
  fields: {
    createFeed: createFeed
  }
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});


export default schema;
