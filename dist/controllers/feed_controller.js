'use strict';

var passport = require('passport');
var v1 = require('uuid/v1');
var multer = require('multer');

var _require = require('ramda'),
    pick = _require.pick;

var Router = require('express').Router;

var _require2 = require('../utils'),
    serialize = _require2.serialize,
    pickDataValues = _require2.pickDataValues;

var _require3 = require('../utils/responseHelper'),
    return401 = _require3.return401;

var Feed = require('../models').feed;
var upload = require('../middlewares/upload');

var uploader = multer();
var jwtAuthenticate = passport.authenticate('jwt', { session: false });

var route = new Router();

route.get('/:id', function (req, res, next) {
  Feed.findById(req.params.id, { include: ['user'] }).then(function (feed) {
    if (feed) {
      return res.json({
        feed: serialize(feed.serializeFields, feed)
      });
    }
  });
});

/* [TODO] add spot */
route.route('/').get(function (req, res) {
  var FEED_LIMIT = 15;
  var offset = parseInt(req.body.nextPageId, 10);

  Feed.findAll({ limit: FEED_LIMIT, offset: Number.isNaN(offset) ? 0 : offset, include: ['user'] }).then(function (feeds) {
    return feeds.map(pickDataValues);
  }).then(function (values) {
    if (values.length === 0) {
      return res.json({
        hasNext: false,
        feeds: []
      });
    }

    return res.json({
      hasNext: true,
      nextPageId: offset + FEED_LIMIT,
      feeds: values
    });
  });
}).post(jwtAuthenticate, uploader.single('image'), function (req, res, next) {
  var allowedParams = ['caption', 'image_url'];

  /* [TODO] handle req.file undefined. simplify logic. */
  if (req.file) {
    var progress = upload('feeds/' + v1(), req.file.buffer, req.file.mimetype);

    progress.on('complete', function (data) {
      req.user.createFeed().then(function (feed) {
        return feed.addFeedSpot(req.body);
      }).then(pickDataValues).then(function (values) {
        res.json({ feed: values });
      }).catch(function (error) {
        var message = error.message.replace("null value in column \"caption\" violates not-null constraint", '貼文內容不可為空白').replace(/Validation error: /g, '');

        res.status(400).json({ error: message });
      });
    });
  } else {
    req.user.createFeed(pick(allowedParams)(req.body)).then(function (feed) {
      return feed.addFeedSpot(req.body);
    }).then(pickDataValues).then(function (values) {
      res.json({ feed: values });
    }).catch(function (error) {
      var message = error.message.replace("null value in column \"caption\" violates not-null constraint", '貼文內容不可為空白').replace(/Validation error: /g, '');

      res.status(400).json({ error: message });
    });
  }
});

route.route('/:id/comments').all(function (req, res, next) {
  Feed.findById(req.params.id).then(function (feed) {

    if (feed) {
      req.feed = feed;
      return next();
    }

    next('Feed not Found.');
  });
}).get(function (req, res, next) {
  req.feed.getActiveComments().then(function (comments) {
    return res.json({
      comments: comments
    });
  }).then();
}).post(jwtAuthenticate, function (req, res, next) {
  if (!req.user) {
    return return401(res);
  }

  var id = req.user.id;

  Feed.findById(req.params.id).then(function (feed) {
    var _req$body = req.body,
        text = _req$body.text,
        comment_type = _req$body.comment_type;

    if (feed) {
      feed.addCommentToFeed({
        text: text,
        user_id: id,
        comment_type: comment_type
      }).then(function (comment) {
        res.json({
          comment: serialize(comment.serializeFields, comment),
          author: pick(['username', 'nickname', 'avatar_url'], req.user)
        });
      });
    } else {
      return next('Feed not Found!');
    }
  });
});

module.exports = route;
//# sourceMappingURL=feed_controller.js.map