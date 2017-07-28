import request from 'supertest';
import app from '../app.js';
import db from '../models';

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


describe('test feed functionality', () => {
  // it('should add spot if feed spot is new', (done) => {
  //   db.feed.findOne().then(feed => feed.createSpot({name: 'myhoem', x:20, y:25.100000000000001}).then(done));

  // })
  
  // it('can return correct value if spot did exist.', (done) => {
  //   db.feed.findOne().then(feed => feed.querySpot({x:10.25, y:25.100000000000001})
  //       .then(results => {
  //         console.log(results);
  //         expect(results[0].name).toBe('藍瓶咖啡聽')
  //         expect(results[0].location).toEqual({
  //           x: 10.25,
  //           y: 25.1
  //         })

  //         done();
  //       })
  //       .catch(done)
  //     );
  // })

  // it('can add feed spot', (done) => {
  //   db.feed.findOne()
  //     .then(feed => feed.addFeedSpot({name: '123', x: 2, y: 3}))
  //     .then((result) => {
  //       expect(result.length).toBeGreaterThan(0)
  //       done();
  //     })
  // })
  
})

describe('User function', () => {
  it('should get user profile if user did exist', (done) => {
    request(app).get('/user/35/profile')
      .then(res => {
        const expected = {
          user: { 
            username: null,
            nickname: '陳愷奕',
            website: null,
            introduction: null,
            avatar_url: { facebook: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/20228652_1345547928886207_9028270778313514546_n.jpg?oh=bb4df444c1dffb4cab5f95bd827512dc&oe=5A02FA50' },
            birthday: null,
            email: null
          }
        };

        expect(res.body).toEqual(expected)
        done();
      })
  })
});
