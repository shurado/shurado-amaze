import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from 'components/GooglePlaceAutoComplete.scss';

const GOOGLE_API_KEY = 'AIzaSyCD4hNTp8MZilgGmTJlDexpdhDHQPTjkxw';

class GooglePlaceAutoComplete extends React.PureComponent {

  constructor(props) {
    super(props);
    this.handleAddPlace = this.handleAddPlace.bind(this);
    this.state = {
      autocomplete: null
    }
  }

  componentWillMount() {
    // inject google map script.
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initMap`;
    script.defer = true;

    if (typeof google === 'undefined') {
      document.body.appendChild(script);
    }
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    const handleAddPlace = this.handleAddPlace;
    const input = this.input;

    window.initMap = function() {
      /* global google */
      const autocomplete = new google.maps.places.Autocomplete(input); 
      autocomplete.addListener('place_changed', handleAddPlace(autocomplete));

      setState({ autocomplete });
    }
  }

  handleAddPlace(autocomplete) {
    const { onPlaceChanged } = this.props;
    return onPlaceChanged 
      && onPlaceChanged.call(null, autocomplete.getPlace());
  }

  render() {
    return (
      <div>
        <div id="place-input" styleName="place-input">
          <input
            ref={(node) => this.input = node}
            type="text" placeholder="打卡..." />
          
        </div>
      </div>
    );
  }
}

GooglePlaceAutoComplete.propTypes = {
  onPlaceChanged: PropTypes.func
}

export default CSSModules(GooglePlaceAutoComplete, styles);
