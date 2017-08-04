const URL_REG = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig; // eslint-disable-line no-useless-escape
const URL_REG_ONCE = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i; // eslint-disable-line no-useless-escape

export function humanReadableTimeDiff(date) {
  if (date instanceof Date) {
    date = new Date(date); // eslint-disable-line no-param-reassign
    if (isNaN(date)) {
      return 0;
    }
  }

  const dateDiff = Date.now() - date;
  if (dateDiff <= 0 || Math.floor(dateDiff / 1000) == 0) {
    return '剛剛';
  }
  if (dateDiff < 1000 * 60) {
    return Math.floor(dateDiff / 1000) + ' 秒之前';
  }
  if (dateDiff < 1000 * 60 * 60) {
    return Math.floor(dateDiff / (1000 * 60)) + ' 分之前';
  }
  if (dateDiff < 1000 * 60 * 60 * 24) {
    return Math.floor(dateDiff / (1000 * 60 * 60)) + ' 小時之前';
  }
  return Math.floor(dateDiff / (1000 * 60 * 60 * 24)) + ' 天之前';
}

export const simpleFormat = (str) => {
  return str.split('\n')
    .map(line => `${line}<br/>`)
    .join('');
}

export const detectURL = (str) => {
  return str.replace(URL_REG, (url) => `<a href='${url}' target='blank'>${url}</a>`);
}

export const detectURLOnce = (str) => {
  const match = str.match(URL_REG_ONCE);
  return match && match[0];
}
