import React from 'react';
import PropTypes from 'prop-types';
import CreateFeedEditor from '../components/editors/CreateFeedEditor';



export default class CreateFeedContainer extends React.Component {
  

  constructor(props) {
    super(props);
  }

  handleFeedSubmit() {
    
  }

  render() {
    // [TODO] setup image upload logic, setup add spot logic.
    return (
      <div>
        <CreateFeedEditor
          ref={(component) => this.editor = component}
          
        />
        <span>上傳圖片</span>
        <span>標註地點</span>
      </div>
    );
  }
}

CreateFeedContainer.propTypes = {
  createFeedRequest: PropTypes.func.isRequired
}
