const routes = {
  USER_PROFILE: '/user/profile',
  getUserProfile: id => `/user/${id}/profile`,
  SIGNOUT: '/user/sign_out',
  FACEBOOK_LOGIN: '/auth/facebook',
  TIMELINE: '/timeline',
}

export default routes;
