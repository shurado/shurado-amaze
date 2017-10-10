import Immutable from 'immutable';

const blockRenderMap = Immutable.Map({
  'header-two': { element: 'h2' },
  'header-three': { element: 'h3' },
  blockquote: { element: 'blockquote' },
  unstyled: { element: 'div' },
})

export const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  }
};

export default blockRenderMap;
