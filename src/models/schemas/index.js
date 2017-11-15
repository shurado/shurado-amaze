
const { 
  GraphQLSchema,
  GraphQLID,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const { feedType } = require('./types/feedType');
const userType = require('./types/userType');
const InfoType = require('./types/InfoType');
const createFeed = require('./mutations/createFeed');

const {
  feed,
  comment,
} = require('../../models/');

const Feed = feed;
const Comment = comment;

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


module.exports = schema;
