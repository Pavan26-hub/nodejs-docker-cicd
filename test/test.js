const request = require('supertest');
const app = require('../index');

describe('GET /', function () {
  it('should return 200 status', function (done) {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

