import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getVisibleSelectionRect, EditorState, RichUtils } from 'draft-js';
import CSSModules from 'react-css-modules';
import cx from 'classnames';

import { getSelectedEntity } from '../../../utils/draftUtils';
import styles from './styles.scss';
import Icon from '../../../components/Icon';

const toolbarItems = [
  {
    type: 'header-two',
    renderer: <span>H</span>
  },
  {
    type: 'header-three',
    renderer: <span>h</span>
  },
  {
    type: 'blockquote',
    renderer: <span>,,</span>
  },
  {
    type: 'bold',
    renderer: <span>B</span>
  },
  {
    type: 'italic',
    renderer: <span style={{fontStyle: 'italic'}}>I</span>
  },
  {
    type: 'code',
    renderer: <span>code</span>
  },
  {
    type: 'link',
    renderer: <span><Icon name="link" color="#fff" /></span>
  }
];


class InlineToolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      position: undefined,
      showPrompt: props.showPrompt
    };

    this.confirmLink = this.confirmLink.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showURLPrompt && (this.props.showURLPrompt !== nextProps.showURLPrompt)) {
      this.promptForLink();
    } else {
      this.setState({ showURLPrompt: nextProps.showURLPrompt });
    }
  }
  onSelectionChanged() {
    // make sure window selection works first.
    setTimeout(() => {
      const toolbarHeight = this.toolbar.clientHeight;
      const relativeRect = this.toolbar.parentElement.getBoundingClientRect();
      const selectionRect = getVisibleSelectionRect(window);

      if (!selectionRect) return;

      this.setState({
        visible: !this.props.selection.isCollapsed(),
        position: {
          top: (selectionRect.top - relativeRect.top) - toolbarHeight,
          left: (selectionRect.left - relativeRect.left) + (selectionRect.width / 2),
        }
      }, () => this.props.onInvisible && this.props.onInvisible())
    })
  }

  getStyle() {
    const { selection } = this.props;
    const isVisible = !selection.isCollapsed();

    if (isVisible) {
      return {
        ...this.state.position,
        visibility: 'visible',
        position: 'absolute',
        userSelect: 'none',
        zIndex: '2',
        transform: 'translateX(-50%) scale(1)',
        transition: 'transform .15s cubic-bezier(.3,1.2,.2,1)'
      }
    }

    return {
      display: 'none',
      visibility: 'hidden'
    }
  }

  getClassName() {
    const { visible } = this.state;
    if (visible) return cx(['Toolbar', 'visible']);

    return cx('Toolbar');
  }

  isToolBarActive(type) {
    const { editorState } = this.props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const currentStyle = editorState.getCurrentInlineStyle();
    const data = getSelectedEntity(editorState);
    
    return blockType === type
      || currentStyle.has(type.toUpperCase())
      || (data && (type === data.type.toLowerCase()))
  }

  renderToolbarItem() {
    
    return toolbarItems.map((item, key) => 
      React.cloneElement(item.renderer, {
        key,
        className: this.isToolBarActive(item.type) ? 'toolbar-active' : '',
        onClick: this.props.onToolBarItemClick.bind(null, item.type, this.isToolBarActive(item.type))
      })
    )
  }

  promptForLink() {
    this.setState(
      { showURLPrompt: true },
      () => setTimeout(() => this.urlInput.focus(), 0)
    );
  }

  confirmLink(e) {
    if (e.keyCode === 13) {
      e.preventDefault();

      const urlValue = e.target.value;
      const { editorState } = this.props;
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'MUTABLE',
        { url: urlValue }
      );
  
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
      this.setState({ showURLPrompt: false, visible: false }, () => this.props.onInvisible && this.props.onInvisible());

      this.props.onLinkCreated(RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ));
    }
  }

  render() {
    const { showURLPrompt } = this.state;
    const entityData = getSelectedEntity(this.props.editorState);
    return (
      <div 
        ref={(elm) => this.toolbar = elm}
        style={this.getStyle()}
        styleName="Toolbar"
        className={this.getClassName()}
        onMouseDown={!showURLPrompt ? (e) => e.preventDefault() : null}
      >
        { !showURLPrompt && this.renderToolbarItem() }
        
        { showURLPrompt && <input
          ref={(elm) => this.urlInput = elm}
          placeholder="輸入連結..."
          onKeyDown={this.confirmLink}
          defaultValue={entityData ? entityData.data.url : null}
        /> }
      </div>
    );
  }
}

InlineToolbar.PropTypes = {
  showURLPrompt: PropTypes.bool,
  editorState: PropTypes.object.isRequired,
  selection: PropTypes.object.isRequired,
  onToolBarItemClick: PropTypes.func,
  onLinkCreated: PropTypes.func,
  onInvisible: PropTypes.func,
};

export default CSSModules(InlineToolbar, styles);
