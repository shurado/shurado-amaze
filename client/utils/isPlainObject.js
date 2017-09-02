/**
 * To see if param is real object.
 *
 * isPlainObject('false'); // false
 * isPlainObject([]); // false
 */

export default function isPlainObject(param) {
  const toString = Object.prototype.toString;
  const hasOwnProp = Object.prototype.hasOwnProperty;

  if (toString.call(param) !== '[object Object]') {
    return false;
  }

  let key = null;

  for (key in param) {}

  return !key || hasOwnProp.call(param, key);
}
