import mongoose from 'mongoose';
import supertest from 'supertest';

import {getRequestListener} from '../src/cli/runserver';
import {User} from '../src/models';
import {MONGODB_URI} from '../src/settings';

const request = supertest(getRequestListener());

const payload = {
  email: 'test.account.user@email.com',
  password: 'PaSsWoRd',
};

describe('Test Account APIs', () => {
  beforeAll(async () => {
    await mongoose.connect(MONGODB_URI);
    const user = new User({
      ...payload,
      firstName: 'Test',
      lastName: 'Account',
    });
    await user.save();
  });

  afterAll(async () => {
    await User.findOneAndDelete({email: payload.email});
    await mongoose.connection.close();
  });

  describe('POST /api/v1/accounts/login', () => {
    it('It performs account login.', async () => {
      const response = await request
          .post('/api/v1/accounts/login')
          .send(payload);
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('GET /api/v1/accounts/detail', () => {
    it('It retrieves account detail.', async () => {
      const user = await User.findOne({email: payload.email});
      const response = await request
          .get('/api/v1/accounts/detail')
          .set('Authorization', `Token ${user.token.key}`);
      expect(response.status).toBe(200);
      expect(response.body.email).toBe(payload.email);
    });
  });

  describe('DELETE /api/v1/accounts/logout', () => {
    it('It performs account logout.', async () => {
      const user = await User.findOne({email: payload.email});
      const response = await request
          .delete('/api/v1/accounts/logout')
          .set('Authorization', `Token ${user.token.key}`);
      expect(response.status).toBe(204);
    });
  });
});
