const resError = (code, defaultMsg) => (res, message) => {
  return res.status(code).json({
    message: message || defaultMsg
  })
};

export const return401 = resError(401, 'Unauthorized Request');
export const return404 = resError(404, 'Not Found');
export const return400 = resError(400, 'Bad Request');
export const return403 = resError(403, 'Forbidden Request');
export const return500 = resError(500, 'Server Internel Error');
