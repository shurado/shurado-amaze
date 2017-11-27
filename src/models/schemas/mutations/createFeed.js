const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
} = require('graphql');

const {
  mutationWithClientMutationId,
} = require('graphql-relay');

const { feedType } = require('../types/feedType');
const userType = require('../types/userType');

const { feed, user } = require('../../index');

const Feed = feed;
const User = user;

const imageInputType = new GraphQLInputObjectType({
  name: 'ImageInputType',
  fields: {
    hd: { type: GraphQLString },
    normal: { type: GraphQLString }
  }
})

const feedMutation = mutationWithClientMutationId({
  name: 'CreateFeed',
  inputFields: {
    caption: {
      type: new GraphQLNonNull(GraphQLString),
    },
    image_url: {
      type: imageInputType
    },
    user_id: {
      type: new GraphQLNonNull(GraphQLID),
    }
  },
  outputFields: {
    feed: { 
      type: feedType,
      resolve: ({ feed_id }) => new Promise(resolve => Feed.findById(feed_id).then(resolve))
    },
    author: {
      type: userType,
      resolve: ({ user_id }) => new Promise(resolve => User.findById(user_id).then(resolve))
    }
  },
  mutateAndGetPayload: ({ caption, image_url, user_id }) => new Promise((resolve, reject) => {
    Feed.create({
      caption,
      image_url,
      user_id
    }).then((feed) => ({
      feed_id: feed.id,
      user_id
    }))
      .then(resolve)
      .catch(reject)
  })
})

module.exports = feedMutation;
