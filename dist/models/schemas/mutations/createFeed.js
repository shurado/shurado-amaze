'use strict';

var _require = require('graphql'),
    GraphQLInputObjectType = _require.GraphQLInputObjectType,
    GraphQLNonNull = _require.GraphQLNonNull,
    GraphQLID = _require.GraphQLID,
    GraphQLString = _require.GraphQLString;

var _require2 = require('graphql-relay'),
    mutationWithClientMutationId = _require2.mutationWithClientMutationId;

var _require3 = require('../types/feedType'),
    feedType = _require3.feedType;

var userType = require('../types/userType');

var _require4 = require('../../index'),
    feed = _require4.feed,
    user = _require4.user;

var Feed = feed;
var User = user;

var imageInputType = new GraphQLInputObjectType({
  name: 'ImageInputType',
  fields: {
    hd: { type: GraphQLString },
    normal: { type: GraphQLString }
  }
});

var feedMutation = mutationWithClientMutationId({
  name: 'CreateFeed',
  inputFields: {
    caption: {
      type: new GraphQLNonNull(GraphQLString)
    },
    image_url: {
      type: imageInputType
    },
    user_id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  outputFields: {
    feed: {
      type: feedType,
      resolve: function resolve(_ref) {
        var feed_id = _ref.feed_id;
        return new Promise(function (resolve) {
          return Feed.findById(feed_id).then(resolve);
        });
      }
    },
    author: {
      type: userType,
      resolve: function resolve(_ref2) {
        var user_id = _ref2.user_id;
        return new Promise(function (resolve) {
          return User.findById(user_id).then(resolve);
        });
      }
    }
  },
  mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
    var caption = _ref3.caption,
        image_url = _ref3.image_url,
        user_id = _ref3.user_id;
    return new Promise(function (resolve, reject) {
      Feed.create({
        caption: caption,
        image_url: image_url,
        user_id: user_id
      }).then(function (feed) {
        return {
          feed_id: feed.id,
          user_id: user_id
        };
      }).then(resolve).catch(reject);
    });
  }
});

module.exports = feedMutation;
//# sourceMappingURL=createFeed.js.map