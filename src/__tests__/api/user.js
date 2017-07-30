import db from '../../models';
import app from '../../app';
import request from 'supertest';

describe('User profile function', () => {
  beforeAll(() => {
    return db.user.create({
      email: 'test@gmail.com'
    })
  });

  it('should get user profile if user did exist', (done) => {
    db.user.findOne()
      .then(user => user.id)
      .then(userId => {
        request(app).get(`/user/${userId}/profile`)
          .then(res => {
            expect(res.body.hasOwnProperty('profile')).toBeTruthy()
            done();
          })
      })
  });

  it('should return 404 if user didn\'t exist', (done) => {
    request(app).get('/user/798765412/profile')
      .then(res => {
        const expected = {
          message: 'user doesn\'t exist'
        }

        expect(res.body).toEqual(expected);
        done()
      })
  })

  it('can edit profile if owner', (done) => {
    db.user
      .findOne()
      .then(user => ({
        userId: user.id,
        token: user.tokenForUser("ji3g4284gj94ek")
      }))
      .then(({userId,token}) => {
        request(app)
          .post(`/user/${userId}/profile`)
          .send({ nickname: 'kalan' })
          .set('Cookie', `jwt_token=${token}`)
          .end((err, res) => {
            expect(res.status).toBe(200);
            expect(res.body.user.nickname).toBe('kalan');

            done();
          })
      })
  });

  it('can show error if user input wrong params', (done) => {
    db.user
      .findOne()
      .then(user => ({
        userId: user.id,
        token: user.tokenForUser("ji3g4284gj94ek")
      }))
      .then(({userId, token}) => {
        request(app)
          .post(`/user/${userId}/profile`)
          .send({ nickname: '', website: '   ' })
          .set('Cookie', `jwt_token=${token}`)
          .end((err, res) => {
            
            const expected = Array.isArray(res.body.errors);

            expect(expected).toBeTruthy();
            done()
          })
      })
  })

  it('can not edit user profile if not owner', (done) => {
    db.user
      .findOne()
      .then(user => user.id)
      .then(userId => {
        request(app).post(`/user/${userId}/profile`)
          .then(res => {
            expect(res.status).toBe(401);
            done()
          })
      })
  });


  afterAll(() => {
    return db.user.destroy({ where: { email: 'test@gmail.com' }})
  })  
});
