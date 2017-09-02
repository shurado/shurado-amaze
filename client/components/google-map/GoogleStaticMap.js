import React from 'react';
import qs from 'util/queryString.js';
import Image from '../Image';

const GoogleStaticMap = (API_KEY) => ({
  size = '500x500',
  scale = 1,
  format = 'png',
  language = 'zh-TW',
  center,
  marker,
  zoom = 13,
}) => {
  const googleMapURL = 'https://maps.googleapis.com/maps/api/staticmap?';
  const queryString = qs({
    size,
    scale,
    format,
    marker,
    language,
    center,
    zoom,
    key: API_KEY
  })

  return <Image src={new URL('?'+queryString, googleMapURL)} />
}


export default GoogleStaticMap('AIzaSyDRv7ZAGVSRJjCHICYOKCGR-NFZW4HBBYA');
