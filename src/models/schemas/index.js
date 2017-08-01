import { 
  graphql,
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} from 'graphql';
import { resolver } from 'graphql-sequelize';

import { feedType, feedById } from './types/feedType';
import createFeed from './mutations/createFeed';

import { feed as Feed, user as User } from '../../models/';

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type',
  fields: {
    feeds: {
      type: new GraphQLList(feedType),
      resolve: () => Feed.findAll({ limit: Feed.FEEDS_LIMIT, include: ['user'] })
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
