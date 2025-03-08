import supertest from 'supertest';
import { aa, ba, testServer } from './common';

beforeAll(ba);
afterAll(aa);

describe('Sample test suite', () => {
  it('Health test', async () => {
    const { statusCode } = await supertest(testServer.app).get(
      '/api/v1/health'
    );
    expect(statusCode).toBe(200);
  });
});
