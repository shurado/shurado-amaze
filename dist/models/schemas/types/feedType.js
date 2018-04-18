'use strict';

var _require = require('graphql'),
    GraphQLID = _require.GraphQLID,
    GraphQLObjectType = _require.GraphQLObjectType,
    GraphQLString = _require.GraphQLString,
    GraphQLInt = _require.GraphQLInt,
    GraphQLList = _require.GraphQLList,
    GraphQLNonNull = _require.GraphQLNonNull;

var SpotType = require('./SpotType');
var userType = require('./userType');
var comment = require('../../../models');

var Comment = comment;

var uniq = function uniq(array) {
  return array.reduce(function (acc, curr) {
    if (acc.indexOf(curr) === -1) {
      acc.push(curr);
    }

    return acc;
  }, []);
};

var imageType = new GraphQLObjectType({
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
});

var commentType = new GraphQLObjectType({
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
      resolve: function resolve(comment) {
        return comment.getUser();
      }
    }
  }
});

var feedType = new GraphQLObjectType({
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
      resolve: function resolve(feed) {
        return new Promise(function (resolve) {
          Comment.count({ attributes: ['user_id'], group: ['user_id'], where: { feed_id: feed.id } }).then(function (result) {
            return resolve(result[0] && result[0].count || 0);
          });
        });
      }
    },
    commenter_ids: {
      type: new GraphQLList(GraphQLInt),
      resolve: function resolve(feed) {
        return Promise.resolve(feed.getComments({ attributes: ['user_id'] }).then(function (comments) {
          return comments.map(function (comment) {
            return comment.user_id;
          });
        }).then(uniq));
      }
    },
    comments: {
      type: new GraphQLList(commentType),
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve: function resolve(feed, args) {
        return Promise.resolve(feed.getComments({
          limit: args.limit || 3,
          offset: args.offset || 0
        }));
      }
    },
    spot: {
      type: SpotType,
      resolve: function resolve(feed) {
        return feed.getSpots().then(function (spots) {
          return spots[0];
        });
      }
    },
    author: {
      type: userType,
      resolve: function resolve(feed) {
        return Promise.resolve(feed.user);
      }
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }
});

var feedById = new GraphQLObjectType({
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

module.exports = {
  feedType: feedType,
  feedById: feedById
};
//# sourceMappingURL=feedType.js.map