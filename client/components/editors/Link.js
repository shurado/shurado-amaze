import React from 'react';
import { pure, lifecycle, compose } from 'recompose';
import { createEntity, applyEntity } from 'utils/draftUtils';


const Link = (props) => {
  const editorState = props.getEditorState();

  return (
    <a>{props.children}</a>
  )
}

export default compose(pure, lifecycle({
  componentWillReceiveProps: function(nextProps) {
    if (nextProps !== this.props) {
      this.props.onCreateLink && this.props.onCreateLink.call(this, nextProps.decoratedText)
    }
  }
}))(Link);
