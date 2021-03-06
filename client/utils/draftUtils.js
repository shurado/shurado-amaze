import { RichUtils, EditorState, Modifier, CompositeDecorator } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export const getPlainText = (editorState) => {
  return editorState
    .getCurrentContent()
    .getPlainText();
}

export const getContentBlockText = (editorState) => {
  const selection = editorState.getSelection();
  return blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getText();
}

/**
 * 
 * @param {EditorState} editorState 
 * @return {String} html string
 */
export const toHTML = (editorState) => {
  return stateToHTML(editorState.getCurrentContent());
}

export const getSelectedText = (editorState) => {
  const selection = editorState.getSelection();
  const blockKey = selection.getStartKey();
  const [startOffset, endOffset] = [selection.getStartOffset(), selection.getEndOffset()];

  return editorState
    .getCurrentContent()
    .getBlockForKey(blockKey)
    .getText().slice(startOffset, endOffset);
}

export const getCurrentBlockType = (editorState) => {
  const selection = editorState.getSelection();
  return editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();  
} 
  
export const toggleBlockType = (editorState, blockType) => {
  if (typeof editorState === 'object' && editorState.constructor.name === 'EditorState') {
    return RichUtils.toggleBlockType(editorState, blockType);
  }
  return false;
}


export const setEditorStateWith = (content, type) => (editorState) => {
  if (type === 'ContentState') {
    return EditorState.push(
      editorState,
      { currentContent: content },
      'set-editor-state'
    );
  }
}

export const setBlockType = (contentState, selectionState, blockType) => {
  const newContentState = Modifier.setBlockType(
    contentState,
    selectionState,
    blockType
  );

  return setEditorStateWith(newContentState, 'ContentState');
}

export const applyEntity = (contentState, selectionState, entityKey = null) => (editorState) => {
  const newContentState = Modifier.applyEntity(
    contentState,
    selectionState,
    entityKey
  );

  return EditorState.push(
    editorState,
    newContentState,
    'apply-entity'
  );
}

/**
 * get selected entity instance (not entity key!)
 * @param  {EditorState} editorState
 * @return {Entity}
 */
export const getSelectedEntity = (editorState) => {
  const selection = editorState.getSelection();

  if (!selection.isCollapsed()) {
    const contentState = editorState.getCurrentContent();
    const startKey     = editorState.getSelection().getStartKey();
    const startOffset  = editorState.getSelection().getStartOffset();
    const blockBegin   = contentState.getBlockForKey(startKey);
    const entityKey    = blockBegin.getEntityAt(startOffset);

    if (entityKey) {
      return contentState.getEntity(entityKey).toJS();
    }
  }

  return null;
}


export const createEntity = (type, mutable, data) => (editorState) => {
  return editorState.getCurrentContent().createEntity(
    type,
    mutable,
    data
  ); 
}

export const applyDecorator = (decorators) => {
  if (Array.isArray(decorators)) {
    return new CompositeDecorator(decorators);
  }

  return null;
}

export const setStartOffset = (offset) => {

}

export const setContentState = (contentState, editorState) => {
  return EditorState.set(editorState, { currentContent: contentStateWithEntity }); 
}
