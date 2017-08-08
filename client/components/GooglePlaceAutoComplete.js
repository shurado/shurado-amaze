import React from 'react';

const GOOGLE_API_KEY = 'AIzaSyCD4hNTp8MZilgGmTJlDexpdhDHQPTjkxw';

export default class GooglePlaceAutoComplete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      autocomplete: null
    }
  }

  componentWillMount() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&callback=initMap`;
    script.defer = true;

    document.body.appendChild(script);
  }

  componentDidMount() {
    const setState = this.setState.bind(this);
    const input = this.input;
    window.initMap = function() {
      window.autocomplete = new google.maps.places.Autocomplete(input);
      setState({ autocomplete: new google.maps.places.Autocomplete(input) });
    }
  }

  render() {
    return (
      <div>
        <div id="place-input">
          <input 
            ref={(node) => this.input = node}
            type="text" placeholder="打卡..." />
          
        </div>
      </div>
    );
  }
}
