import React from 'react';
import CSSModules from 'react-css-modules';
import styles from 'components/SignInForm.scss';

import Image from '../Image';
import SocialButtons from '../buttons/SocialButtons';


class SignInForm extends React.Component {
  

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName="signin-form">
        <div styleName="logo-icon">
          <Image 
            src="/images/logo-icon.png"
            size="60x60"
          />
        </div>
        <div>
          <SocialButtons 
            type="facebook"
            href="/auth/facebook"
          />
        </div>
        
      </div>
    );
  }
}

export default CSSModules(SignInForm, styles);
