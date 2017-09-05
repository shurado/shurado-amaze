import React from 'react';

/**
 * decorate other props for some purpose.
 * [TODO] 
 * @param  {[type]} BaseComponent [description]
 * @param  {[type]} props         [description]
 * @return {[type]}               [description]
 */
export default (BaseComponent, props) => (class extends React.Component {
  render() {
    return (
      <BaseComponent {...this.props} {...props} />
    )    
  }
})
