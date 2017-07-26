import request from 'supertest';
import app from '../app.js';

describe('test root path', function() {
  it('should response the GET method', done => {
    request(app).get('/').then(res => {
      expect(res.statusCode).toBe(200);
      done();
    })
  })
});

describe('test facebook login', () => {
  it('should redirect facebook', done => {
    request(app).get('/auth/facebook')
      .then(res => {
        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toMatch(/https\:\/\/www.facebook.com\/dialog\/oauth/);
        done();    
      })
  })
})
