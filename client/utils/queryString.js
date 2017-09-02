import isPlainObject from './isPlainObject';

export default function qs(params = {}, seperator = '&', encode) {

  const encodeFn = encode !== undefined ? encode : encodeURIComponent;

  return Object.keys(params)
    .map(key => `${encodeFn(key)}=${encodeFn(params[key])}`)
    .sort()
    .join(seperator)
}
