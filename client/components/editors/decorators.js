import { CompositeDecorator } from 'draft-js';
import { URL_REG_ONCE } from 'utils';

function findURLEntity(contentBlock, callback, contentState) {
  let matchArr, start;
  const contentText = contentBlock.getText();

  while ((matchArr = URL_REG_ONCE.exec(contentText)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0] + length)
  }
}

const decorator = new CompositeDecorator([
  {
    strategy: findURLEntity,

  },
])

export default decorator;
