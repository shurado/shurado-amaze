import React from 'react';
import { pure, lifecycle, compose } from 'recompose';
import { createEntity, applyEntity } from 'utils/draftUtils';


const getVideoID = (url) => /.+(?:youtube\.com\/v\/|youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([^\&\?\/]+)/.exec(url)[1];

const Link = (props) => {
  const editorState = props.getEditorState();

  return (
    <a href={props.decoratedText}>{props.children}</a>
  )
}

export function TextLink(props) {
  const {url} = props.contentState.getEntity(props.entityKey).getData();

  return <a 
    href={url}
  >{props.children}</a>
}

export default compose(pure, lifecycle({
  componentWillReceiveProps: function(nextProps) {
    if (nextProps !== this.props) {
      this.props.onCreateLink && this.props.onCreateLink.call(this, nextProps.decoratedText)
    }
  }
}))(Link);
