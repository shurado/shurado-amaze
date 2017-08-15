import passport from 'passport';
import v1 from 'uuid/v1';
import multer from 'multer';
import { pick } from 'ramda';
import { Router } from 'express';

import { serialize, pickDataValues, nullResponse, toHumanReadable } from '../utils';
import { return404, return400, return401 } from '../utils/responseHelper';
import { feed as Feed } from '../models';
import { feedUploader } from '../services/uploader';
import jwtLogin from '../lib/jwt';
import upload from '../middlewares/upload';


const uploader = multer();
const jwtAuthenticate = passport.authenticate('jwt', { session: false });

const route = new Router();

route.get('/:id', (req, res, next) => {
  Feed
    .findById(req.params.id, { include: ['user'] })
    .then((feed) => {
      if (feed) {
        return res.json({
          feed: serialize(feed.serializeFields, feed)
        })
      }
    });
});

/* [TODO] add spot */
route
  .route('/')
  .get((req, res) => {
    const FEED_LIMIT = 15;
    const offset = parseInt(req.body.nextPageId, 10);

    Feed
      .findAll({ limit: FEED_LIMIT, offset: Number.isNaN(offset) ? 0 : offset, include: ['user'] })
      .then(feeds => feeds.map(pickDataValues))
      .then(values => {
        if (values.length === 0) {
          return res.json({
            hasNext: false,
            feeds: [],
          });
        }

        return res.json({
          hasNext: true,
          nextPageId: offset + FEED_LIMIT,
          feeds: values
        });
      })
  })
  .post(jwtAuthenticate, uploader.single('image'), (req, res, next) => {
    const allowedParams = ['caption', 'image_url'];

    /* [TODO] handle req.file undefined. simplify logic. */
    if (req.file) {
      const progress = upload('feeds/' + v1(), req.file.buffer, req.file.mimetype);

      progress.on('complete', (data) => {
        req.user
          .createFeed(pick(allowedParams)({
            ...req.body,
            image_url: {
              normal: data.Location
            }
          }))
          .then(feed => {
            return feed.addFeedSpot({...req.body});
          })
          .then(pickDataValues)
          .then(values => {
            res.json({ feed: values })
          })
          .catch(error => {
            const message = error.message
              .replace("null value in column \"caption\" violates not-null constraint", '貼文內容不可為空白')
              .replace(/Validation error: /g, '');

            res.status(400).json({ error: message });
          })
      })
    } else {
      req.user
        .createFeed(pick(allowedParams)(req.body))
        .then(feed => {
          return feed.addFeedSpot({...req.body})
        })
        .then(pickDataValues)
        .then(values => {
          res.json({ feed: values })
        })
        .catch(error => {
          const message = error.message
            .replace("null value in column \"caption\" violates not-null constraint", '貼文內容不可為空白')
            .replace(/Validation error: /g, '');

          res.status(400).json({ error: message });
        })
    }
  });

route
  .route('/:id/comments')
  .all((req, res, next) => {
    Feed.findById(req.params.id).then(feed => {
      
      if (feed) {
        req.feed = feed;
        return next();
      }

      next('Feed not Found.');
    });
  })
  .get((req, res, next) => {
    req.feed.getActiveComments()
      .then(comments => {
        return res.json({
          comments
        })
      })
      .then()
  })
  .post(jwtAuthenticate, (req, res, next) => {
    if (!req.user) {
      return return401(res);
    }

    const id = req.user.id;

    Feed.findById(req.params.id)
      .then(feed => {
        const { text, comment_type } = req.body;
        if (feed) {
          feed.addCommentToFeed({
            text,
            user_id: id,
            comment_type
          }).then(comment => {
            res.json({
              comment: serialize(comment.serializeFields, comment),
              author: pick(['username', 'nickname', 'avatar_url'], req.user)
            })
          })
        } else {
          return next('Feed not Found!');
        }
      })
});


export default route;
