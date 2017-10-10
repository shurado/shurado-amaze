import { getPlainText, toHTML } from '../draftUtils';
import { EditorState, Modifier } from 'draft-js';

describe('draftUtils', () => {
  it('getPlainText#should return plain text', () => {
    const editorState = EditorState.createEmpty();
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const nextContentState = Modifier.insertText(
      currentContent,
      selection,
      'https://www.sudo.com.tw'
    );
    const nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'insert-characters'
    );

    expect(getPlainText(nextEditorState)).toBe('https://www.sudo.com.tw');
  })

  it('toHTML#get html format correctly', () => {
    const editorState = EditorState.createEmpty();
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const nextContentState = Modifier.insertText(
      currentContent,
      selection,
      'https://www.sudo.com.tw'
    );
    const nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'insert-characters'
    );

    expect(toHTML(nextEditorState)).toBe('<p>https://www.sudo.com.tw</p>');
  })

  
});
