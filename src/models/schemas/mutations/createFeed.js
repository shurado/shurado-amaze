import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString, GraphQLInt,
  GraphQLBoolean,
} from 'graphql';

import {
  mutationWithClientMutationId,
} from 'graphql-relay';

import { feedType } from '../types/feedType';
import userType from '../types/userType';

import { feed as Feed, user as User } from '../../index';


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

export default feedMutation;
