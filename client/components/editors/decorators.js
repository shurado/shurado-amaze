import { URL_REG_ONCE } from 'utils';

function detectURL(contentBlock, callback, contentState) {
  const contentText = contentBlock.getText();

  const matchArr = contentText.match(URL_REG_ONCE);

  if (matchArr && matchArr.length > 0) {
    callback(matchArr.index, matchArr.index + matchArr[0].length);
  }
}

export function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK')
    },
    callback
  );
}

export default detectURL;
