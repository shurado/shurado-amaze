import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLastestFeed } from '../stores/Feed/modules';
import { fetchURLRequest } from '../stores/Services/modules';

import CreateFeedEditor from '../components/editors/CreateFeedEditor';
import GooglePlaceAutoComplete from '../components/GooglePlaceAutoComplete';
import URLPreview from '../components/URLPreview';

class CreateFeedContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      disabled: false,
      formData: new FormData(),
    }

    this.uploadFile = this.uploadFile.bind(this);
    this.handleFeedSubmit = this.handleFeedSubmit.bind(this);
    this.handleUploadFile = this.handleUploadFile.bind(this);
    this.addSpotToFeed    = this.addSpotToFeed.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feed.success) {
      this.props.fetchNewFeed();
      this.editor.clearAll();
      this.setState({
        disabled: false,
        formData: new FormData(),
      })
    }
  }

  componentDidUpdate(prevProps) {
    const { feed } = this.props;
    const { feedId } = prevProps.feed;

    if (prevProps.feed.success && !feed.success) {
      this.props.loadLastestFeed(feedId);
    }
  }

  addSpotToFeed(placeInfo) {
    const { formData } = this.state;

    formData.set('name', placeInfo.name);
    formData.set('x', placeInfo.geometry.location.lat());
    formData.set('y', placeInfo.geometry.location.lng());

    this.setState({ formData });
  }

  handleFeedSubmit(e) {
    const { createFeedRequest } = this.props;
    const { formData } = this.state;
    if (formData.has('caption')) {
      formData.set('caption', this.editor.getPlainText())
    } else {
      formData.append('caption', this.editor.getPlainText());
    }
    
    createFeedRequest(formData);
  }

  handleUploadFile() {
    const file = this.input.files[0];
    const { formData } = this.state;
    formData.set(this.input.getAttribute('name') || file, file);

    this.setState({ formData: formData });
  }

  uploadFile(e) {
    this.input.click();
  }

  render() {
    const { service } = this.props;

    return (
      <div style={{padding: '20px',marginBottom: '20px', backgroundColor: '#ffffff'}}>
        <CreateFeedEditor
          onCreateLink={this.props.fetchURLRequest}
          ref={(component) => this.editor = component}
        />
        { (!service.isLoading && service.url) ? <URLPreview {...this.props.service.url} /> : null }
        
        <div className="disabled">
          
          <span onClick={this.uploadFile}>
            上傳
            <input ref={node => this.input = node} 
              type="file" 
              name="image"
              onChange={this.handleUploadFile}
              hidden={true} 
            />
          </span>
          <span>標註地點</span>
          <button onClick={this.handleFeedSubmit}>發佈</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNewFeed: bindActionCreators(fetchLastestFeed, dispatch),
  fetchURLRequest: bindActionCreators(fetchURLRequest, dispatch),
})

const mapStateToProps = (state) => ({
  feed: state.feed,
  service: state.service,
});

CreateFeedContainer.propTypes = {
  createFeedRequest: PropTypes.func.isRequired,
  fetchNewFeed: PropTypes.func.isRequired,
  fetchURLRequest: PropTypes.func.isRequired,
  loadLastestFeed: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeedContainer);
