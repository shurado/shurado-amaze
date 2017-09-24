import { CompositeDecorator } from 'draft-js';
import { URL_REG_ONCE } from 'utils';

import Link from './Link';


function detectURL(contentBlock, callback, contentState) {
  const contentText = contentBlock.getText();

  const matchArr = contentText.match(URL_REG_ONCE);

  if (matchArr && matchArr.length > 0) {
    callback(matchArr.index, matchArr.index + matchArr[0].length);
  }
}

function detectFurigana(contentBlock, callback, contentState) {
  
}

const decorators = [
  {
    strategy: detectURL,
    component: Link
  },
];

export default detectURL;
