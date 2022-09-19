const request = require('supertest');
const app = require('../server');
describe('Offer Endpoints', () => {
  describe('should return all offers', () => {
    it('GET', async () => {
      const res = await request(app).get('/api/offer');
      expect(res.statusCode).toEqual(201);
    });
  });
});
