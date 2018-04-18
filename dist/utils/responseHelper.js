'use strict';

var resError = function resError(code, defaultMsg) {
  return function (res, message) {
    return res.status(code).json({
      message: message || defaultMsg
    });
  };
};

module.exports = {
  return401: resError(401, 'Unauthorized Request'),
  return404: resError(404, 'Not Found'),
  return400: resError(400, 'Bad Request'),
  return403: resError(403, 'Forbidden Request'),
  return500: resError(500, 'Server Internel Error')
};
//# sourceMappingURL=responseHelper.js.map