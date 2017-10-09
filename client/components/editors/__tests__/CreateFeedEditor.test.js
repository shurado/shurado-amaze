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
  it('should render correctly', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<CreateFeedEditor
      onCreateLink={mockFn}
    />);
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
    instance.onChange(nextEditorState);
    console.log(nextEditorState.getCurrentContent().getPlainText())

    expect(mockFn).toHaveBeenCalled();
  });

  it('should call onCreateLink if detect URL', () => {
    
  })

});
