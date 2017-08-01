import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { getProfileEpic, INIT_USER_INFO, fetchProfileRequest, FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS } from '../../stores/User/modules';

const epicMiddleware = createEpicMiddleware(getProfileEpic);
const mockStore = configureMockStore([epicMiddleware]);

describe('getProfileEpic', function() {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    nock.cleanAll();
    epicMiddleware.replaceEpic(getProfileEpic);
  })

  it('get user profile', () => {
    const userId = 1;
    const payload = {
      avatar_url: {
        facebook: 'https://facebook.com'
      },
      birthday: null,
      email: null,
      introduction: null,
      nickname: 'kalan',
      username: 'kalan111',
    };

    const scope = nock('http://localhost:8080')
      .get(`/api/user/${userId}`)
      .reply(200, 1)

    store.dispatch({type: INIT_USER_INFO});
    expect(store.getActions()).toEqual([
      { type: FETCH_PROFILE_REQUEST },
      
    ])
  })
});
