import { URL_REG_ONCE } from 'utils';

function detectURL(contentBlock, callback, contentState) {
  const contentText = contentBlock.getText();

  const matchArr = contentText.match(URL_REG_ONCE);

  if (matchArr && matchArr.length > 0) {
    callback(matchArr.index, matchArr.index + matchArr[0].length);
  }
}

export default detectURL;
