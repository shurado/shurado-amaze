import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLastestFeed } from '../stores/Feed/modules';
import CreateFeedEditor from '../components/editors/CreateFeedEditor';

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

  handleFeedSubmit(e) {
    const { createFeedRequest } = this.props;
    const { formData } = this.state;
    if (formData.has('caption')) {
      formData.set('caption', this.editor.textToHTML())
    } else {
      formData.append('caption', this.editor.textToHTML());
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
    
    return (
      <div style={{marginBottom: '20px'}}>
        <CreateFeedEditor
          ref={(component) => this.editor = component}
        />
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
})

const mapStateToProps = (state) => ({
  feed: state.feed,
});

CreateFeedContainer.propTypes = {
  createFeedRequest: PropTypes.func.isRequired,
  fetchNewFeed: PropTypes.func.isRequired,
  loadLastestFeed: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeedContainer);
