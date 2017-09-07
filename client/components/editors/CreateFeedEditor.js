import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import styles from 'components/Editor.scss';
import { detectURLOnce } from 'utils';
import { getPlainText, applyDecorator } from 'utils/draftUtils';

import decorateComponentWithProps from '../HOC/decorateComponentWithProps';
import detectURL from './decorators';
import Link from './Link';

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
    this.onChange = (editorState) => {
      this.setState({ editorState });
    };
    this.focus = () => this.refs.editor.focus();
    this.onTab = (e) => this._onTab(e);

    const decorator = applyDecorator([
      {
        strategy: detectURL,
        component: decorateComponentWithProps(Link, {
          getEditorState: this.getEditorState.bind(this),
          setEditorState: this.onChange.bind(this),
          onCreateLink: console.log
        })
      }
    ])
    this.state = { 
      editorState: props.rawValue 
        ? EditorState.createWithContent(convertToContent(props.rawValue))
        : EditorState.createEmpty() 
    };
  }

  componentWillMount() {
    const decorator = applyDecorator([
      {
        strategy: detectURL,
        component: decorateComponentWithProps(Link, {
          getEditorState: this.getEditorState.bind(this),
          setEditorState: this.onChange.bind(this),
          onCreateLink: this.props.onCreateLink || function() {}
        })
      }
    ])

    this.onChange(EditorState.createEmpty(decorator))
  }

  getEditorState() {
    return this.state.editorState;
  }

  parseFeedURL() {
    
  }

  clearAll() {
    this.setState({ editorState: EditorState.createEmpty() });
  }

  getPlainText() {
    const plainText = getPlainText(this.state.editorState);
    return plainText === '<p></p>' ? '' : plainText;
  }

  textToHTML() {
    const contentState = this.state.editorState.getCurrentContent();

    return stateToHTML(contentState);
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
