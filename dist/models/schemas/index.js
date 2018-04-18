'use strict';

var _require = require('graphql'),
    GraphQLSchema = _require.GraphQLSchema,
    GraphQLID = _require.GraphQLID,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull;

var _require2 = require('./types/feedType'),
    feedType = _require2.feedType;

var userType = require('./types/userType');
var InfoType = require('./types/InfoType');
var createFeed = require('./mutations/createFeed');

var _require3 = require('../../models/'),
    feed = _require3.feed,
    comment = _require3.comment;

var Feed = feed;
var Comment = comment;

var queryType = new GraphQLObjectType({
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
      resolve: function resolve(_, args) {
        return Promise.all([Feed.findAndCountAll({ where: { user_id: args.userId }, attributes: ['id'] }), Comment.findAndCountAll({ where: { user_id: args.userId }, attributes: ['id'] })]);
      }
    },
    feeds: {
      type: new GraphQLList(feedType),
      args: {
        offset: { type: GraphQLInt }
      },
      resolve: function resolve(_, args) {
        return Feed.findAll({ limit: Feed.FEEDS_LIMIT, include: ['user'], offset: args.offset, order: [['createdAt', 'DESC']] });
      }
    },
    feed: {
      type: feedType,
      args: {
        id: {
          type: GraphQLID
        }
      },
      resolve: function resolve(_, args) {
        return new Promise(function (resolve) {
          Feed.findById(args.id, { include: ['user'] }).then(resolve);
        });
      }
    },
    userFeeds: {
      type: new GraphQLList(feedType),
      args: {
        user_id: { type: GraphQLID }
      },
      resolve: function resolve(_, _ref) {
        var user_id = _ref.user_id;
        return Promise.resolve(Feed.findAll({ where: { user_id: user_id } }));
      }
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
var mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The root Mutation Object',
  fields: {
    createFeed: createFeed
  }
});

var schema = new GraphQLSchema({
  query: queryType,
  mutation: mutation
});

module.exports = schema;
//# sourceMappingURL=index.js.map