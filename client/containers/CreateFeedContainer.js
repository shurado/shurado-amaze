import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchLastestFeed } from '../stores/Feed/modules';
import CreateFeedEditor from '../components/editors/CreateFeedEditor';

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchNewFeed: bindActionCreators(fetchLastestFeed, dispatch),
})

const mapStateToProps = (state) => ({
  feed: state.feed,

});

class CreateFeedContainer extends React.Component {
  

  constructor(props) {
    super(props);
    this.handleFeedSubmit = this.handleFeedSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.feed.success) {
      this.props.fetchNewFeed();
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
    createFeedRequest({
      caption: this.editor.textToHTML()
    });
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
        <button onClick={this.handleFeedSubmit}>發佈</button>
      </div>
    );
  }
}

CreateFeedContainer.propTypes = {
  createFeedRequest: PropTypes.func.isRequired,
  fetchNewFeed: PropTypes.func.isRequired,
  loadLastestFeed: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeedContainer);
