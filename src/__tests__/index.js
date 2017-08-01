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

describe('Get next page feed', function() {
  // beforeAll(() => {
  //   var comments = [];
  //   for (var i = 0; i < 10; i++) {
  //     var comment = db.comment.build({
  //       text: '你的建議很棒' + i,
  //       user_id: ''
  //     })
  //   }

  //   return db.feed.
  // })
});


describe('test feed functionality', () => {
  beforeAll(() => {
    return db.feed.create({ caption: '這邊好好玩', image_url: { normal: 'https://www.image.url' } });
  });

  afterAll(() => {
    return db.feed.destroy({ where: { caption: '這邊好好玩'} });
  })

  it('should add spot if feed spot is new', (done) => {
    db.feed.findOne()
      .then(feed => feed.addFeedSpot({name: '藍瓶咖啡廳', x:20, y:25.456 }))
      .then((spots) => {
        const spot = spots[0];
        const expected = {
          location: { x: 20, y: 25.456 },
          name: '藍瓶咖啡廳',
        };

        const { location, name } = spot;
        expect({
          location,
          name
        }).toEqual(expected);
      })
      .then(done)
  })
  
  it('can return correct value if spot did exist.', (done) => {
    db.feed.findOne().then(feed => feed.querySpot({x:10.25, y:25.100000000000001})
        .then(results => {
          console.log(results);
          expect(results[0].name).toBe('藍瓶咖啡聽')
          expect(results[0].location).toEqual({
            x: 10.25,
            y: 25.1
          })

          done();
        })
        .catch(done)
      );
  })

  it('can add feed spot', (done) => {
    db.feed.findOne()
      .then(feed => feed.addFeedSpot({name: '123', x: 2, y: 3}))
      .then((result) => {
        expect(result.length).toBeGreaterThan(0)
        done();
      })
  })
  
})


