import React from 'react';
import CreateFeedEditor from '../CreateFeedEditor';
import { mount } from 'enzyme';
import { Modifier, EditorState, convertFromHTML, ContentState } from 'draft-js';

function convertToContent(rawValue) {
  const blocksFromHTML = convertFromHTML(rawValue);
  const state = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );

  return state;
}


describe('CreateFeedEditor', () => {
  it('should render content correctly', () => {
    const wrapper = mount(<CreateFeedEditor />);
    const instance = wrapper.instance();
    const selection = instance.state.editorState.getSelection();
    const currentBlock = instance.state.editorState.getCurrentContent();
    const nextContentState = Modifier.insertText(
      currentBlock,
      selection,
      'https://www.sudo.com.tw'
    );
    const nextEditorState = EditorState.push(
      instance.state.editorState,
      nextContentState,
      'insert-characters'
    );
    wrapper.setState({ editorState: nextEditorState });

    expect(instance.state.editorState.getCurrentContent().getPlainText()).toBe('https://www.sudo.com.tw');
  });

  it('should call onCreateLink if detect URL', () => {
    
  });
});

