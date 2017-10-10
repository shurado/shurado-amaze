import React from 'react';
import PropTypes from 'prop-types';
import { 
  Editor,
  EditorState,
  RichUtils,
  ContentState,
  convertFromHTML,
  Modifier,
  getDefaultKeyBinding,
  KeyBindingUtil
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'components/Editor.scss';
import { getPlainText, applyDecorator, applyEntity } from '../../utils/draftUtils';

import { styleMap } from './renderMap';
import decorateComponentWithProps from '../HOC/decorateComponentWithProps';
import detectURL, { findLinkEntities } from './decorators';
import Link, { TextLink } from './Link';
import InlineToolBar from './InlineToolbar';

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
      this.setState({ editorState }, () => {
        this.refs.toolbar.onSelectionChanged();
      });
    };
    this.focus = () => this.refs.editor.focus();
    this.onTab = (e) => this._onTab(e);
    this.handleToolBarClick = this.handleToolBarClick.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.state = { 
      editorState: props.rawValue
        ? EditorState.createWithContent(convertToContent(props.rawValue))
        : EditorState.createEmpty(),
      showURLPrompt: false
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
      },
      {
        strategy: findLinkEntities,
        component: TextLink
      }
    ])

    this.onChange(EditorState.createEmpty(decorator));
  }

  getEditorState() {
    return this.state.editorState;
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

  handleToolBarClick(type, active) {
    const { editorState } = this.state;

    // debugger;
    switch (type) {
      case 'header-two':
      case 'header-three':
      case 'blockquote':
        return this.onChange(
          RichUtils.toggleBlockType(
            editorState,
            type
          )
        )
      case 'bold':
      case 'italic':
        return this.onChange(
          RichUtils.toggleInlineStyle(
            editorState,
            type.toUpperCase()
          )
        );
      case 'code':
        return this.onChange(
          RichUtils.toggleCode(editorState)
        )
      case 'link':
        if (!active) {
          this.setState(prevState => ({ showURLPrompt: !prevState.showURLPrompt }));
        } else {
          this.onChange(applyEntity(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            null
          )(editorState));
        }
        
    }
  }
  
  handleKeyCommand(command) {
    const { editorState } = this.state;
    if (command === 'soft-break') {
      this.onChange(
        RichUtils.insertSoftNewline(
          this.state.editorState
        )
      )
      return true;
    }

    if (command === 'create-link') {
      this.setState({ showURLPrompt: true });
      return true;
    }

    const newState = RichUtils.handleKeyCommand(editorState, command);

    // force reset content blocktype when new block.
    if (command === 'split-block') {
      const contentState = Modifier.splitBlock(
        editorState.getCurrentContent(),
        editorState.getSelection()
      );
      
      const newEditorState = EditorState.push(
        editorState,
        contentState,
        'split-block'
      );
      
      this.onChange(RichUtils.toggleBlockType(
        newEditorState,
        'unstyled'
      ));

      return true;
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }

    return false;
  }

  editorKeyBindingFn(e) {
    if (e.keyCode === 13 && e.shiftKey) {
      return 'soft-break';
    }

    if (e.keyCode === 75 && KeyBindingUtil.hasCommandModifier(e)) {
      return 'create-link';
    }

    return getDefaultKeyBinding(e);
  }

  render() {
    const { editorState } = this.state;
    
    return (
      <div style={{position: 'relative'}}>
        { this.props.children }
        <InlineToolBar
          ref="toolbar"
          editorState={editorState}
          selection={editorState.getSelection()}
          onToolBarItemClick={this.handleToolBarClick}
          onLinkCreated={this.onChange}
          showURLPrompt={this.state.showURLPrompt}
          onInvisible={() => this.setState({ showURLPrompt: false })}
        />
        <Editor
          ref="editor"
          editorState={editorState}
          onChange={this.onChange}
          customStyleMap={styleMap}
          placeholder="用日文發表你的動態、想法、學習心得......"
          spellCheck={true}
          keyBindingFn={this.editorKeyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
        />
      </div>
    );
  }
}
