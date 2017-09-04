import React from 'react';
import { Observable } from 'rxjs';

import GoogleStaticMap from './google-map/GoogleStaticMap';
import Icon from './Icon.js';

export default class SpotNameDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMap: false
    }
  }

  showMap() {
    this.setState({ showMap: true });
  }

  componentDidMount() {
    Observable.fromEvent(this.trigger, 'mouseenter')
      .delay(1500)
      .subscribe(this.showMap.bind(this))
  }

  render() {
    const { name, lat, lng } = this.props;
    const { showMap } = this.state;

    return (
      <span style={{fontSize: '.85em', position: 'relative'}} ref={(node) => this.trigger = node}>
        <Icon name="spot" color="#fe6565" />在 { name }
        { showMap ? <GoogleStaticMap markers={`${lat},${lng}`} center={`${lat},${lng}`} /> : null }
      </span>
    );
  }
}
