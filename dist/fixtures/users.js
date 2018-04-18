'use strict';

var getGender = function getGender() {
  return Math.random(1) > 0.5 ? 'female' : 'male';
};
var users = [{
  nickname: '吳曉婷',
  username: 'wu sandy',
  birthday: new Date() - 100000,
  email: 'm9412123@gmail.com',
  gender: getGender(),
  website: 'https://www.shurado.com'
}, {
  nickname: '陳進堂',
  username: 'kalan chen',
  birthday: new Date() - 12324098,
  email: '19840106@yahoo.com.tw',
  gender: getGender(),
  website: 'https://www.facebook.com'
}, {
  nickname: '李大仁',
  username: 'Lee San',
  birthday: new Date() - 31485891,
  email: 'leesan@gamil.com',
  gender: getGender(),
  website: 'https://juejin.im/entry/598327225188253da1331024/detail'
}, {
  nickname: '陳帥人',
  username: 'kalan handsome',
  birthday: new Date('1994-11-11'),
  email: 'kjj123456@outlook.com',
  gender: getGender(),
  website: 'https://kjj6198.github.io'
}, {
  nickname: '蘇娟如',
  username: 'suanngel',
  birthday: new Date('1980-3-20'),
  email: 'sugan@gmail.com',
  gender: getGender(),
  website: 'https://www.youtube.com'
}];
//# sourceMappingURL=users.js.map