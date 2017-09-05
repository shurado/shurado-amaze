import React from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';
import { branch, renderComponent, setPropTypes, compose } from 'recompose';
import { Redirect } from 'react-router-dom';

import styles from 'components/Profile.scss';
import Image from './Image';
import Input from './Input';

const UserProfile = ({ editProfile, profile, userId }) => {
  const bindEditProfile = (field) => (e) => {
    editProfile({ id: userId, [field]: e.target.value })
  }
    

  return (
    <div styleName="profile">
      <div styleName="user-info">
        <Image src={profile.avatar_url.facebook} styleName="avatar" size="50x50" />
        <span>{profile.nickname}</span>
      </div>

      <div styleName="user-info__fields">
        <Input 
          type="text" 
          labelText="暱稱"
          defaultValue={profile.nickname}
          onChange={bindEditProfile('nickname')}
        />
        <Input type="text"  id="username"  labelText="用戶名稱" onChange={bindEditProfile('username')}     />
        <Input type="url"   id="website" labelText="個人網站" onChange={bindEditProfile('website')}      />
        <Input type="text"  id="introduction" labelText="個人簡介" onChange={bindEditProfile('introduction')} />
        <Input type="email" id="email" labelText="電子郵件" onChange={bindEditProfile('email')}        />
        <select>
          <option value="male">男</option>
          <option value="female">女</option>
        </select>
      </div>
    </div>
  );
}


export default compose(
  setPropTypes({
    editProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
)(CSSModules(UserProfile, styles))
