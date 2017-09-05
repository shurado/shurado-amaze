import React from 'react';
import { createEntity, applyEntity } from 'utils/draftUtils';


const Link = (props) => {
  const editorState = props.getEditorState();
  console.log(editorState.getSelection());

  return (
    <a>{props.children}</a>
  )
}

export default Link;
