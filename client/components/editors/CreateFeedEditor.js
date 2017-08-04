import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import styles from 'components/Editor.scss';
import { detectURLOnce } from 'utils';

function convertToContent(rawValue) {
  const blocksFromHTML = convertFromHTML(rawValue);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return state;
}

export default class CreateFeedEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { 
      editorState: props.rawValue 
        ? EditorState.createWithContent(convertToContent(props.rawValue), decorator) 
        : EditorState.createEmpty() 
    };

    this.focus = () => this.refs.editor.focus();
    this.onTab = (e) => this._onTab(e);
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
  }

  parseFeedURL() {
    
  }

  render() {
    const { editorState } = this.state;
    return (
      <div>
        { this.props.children }
        <Editor
          ref={component => this.editor = component}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          placeholder="用日文發表你的動態、想法、學習心得......"
          
          spellCheck={true}
        />
      </div>
    );
  }
}
