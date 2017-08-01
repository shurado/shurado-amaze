import React from 'react';

import CSSModules from 'react-css-modules';
import { branch, renderComponent, toClass } from 'recompose';
import { Redirect } from 'react-router-dom';

import styles from 'components/Profile.scss';
import Image from './Image';
import Input from './Input';

const UserProfile = ({ editProfile, profile, userId, isLoggedIn }) => {
  const bindEditProfile = (field) => (e) => {
    return editProfile({ id: userId, [field]: e.target.value });
  };

  return (
    <div styleName="profile">
      <div styleName="user-info">
        <Image src={profile.avatar_url.facebook} styleName="avatar" />
        <span>{profile.nickname}</span>
      </div>

      <div className="user-info__fields">
        <Input 
          type="text" 
          labelText="暱稱"
          defaultValue={profile.nickname}
          onChange={bindEditProfile('nickname')}
        />
        <Input type="text" labelText="用戶名稱" onChange={bindEditProfile('username')} />
        <Input type="url" labelText="個人網站" onChange={bindEditProfile('website')} />
        <Input type="text" labelText="個人簡介" onChange={bindEditProfile('introduction')} />
        <Input type="email" labelText="電子郵件" onChange={bindEditProfile('email')} />
        <Input type="text" labelText="性別" />
      </div>
    </div>
  );
}


export default branch(
  ({ isLoggedIn }) => !isLoggedIn,
  renderComponent(() => <Redirect to="/" />)
)(CSSModules(UserProfile, styles))