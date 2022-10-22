const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

const createUserError = {
  error: 'username or password invalid',
};

const usernameExistsError = {
  error: 'username already exists',
};

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
});

describe('POST /users', () => {
  test('user with too short username is not created', async () => {
    const testUser = {
      username: 'te',
      name: 'test1',
      password: 'test',
    };
    const res = await api.post('/api/users').send(testUser);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(createUserError);
    const existingUser = await User.findOne({ username: testUser.username });
    expect(existingUser).toBe(null);
  });

  test('user with existing username is not created', async () => {
    const testUser = {
      username: 'test',
      name: 'test1',
      password: 'test',
    };
    await api.post('/api/users').send(testUser);
    const res = await api.post('/api/users').send(testUser);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(usernameExistsError);
  });

  test('user with too short password is not created', async () => {
    const testUser = {
      username: 'test',
      name: 'test1',
      password: 'te',
    };

    const res = await api.post('/api/users').send(testUser);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(createUserError);
    const existingUser = await User.findOne({ username: testUser.username });
    expect(existingUser).toBe(null);
  });
});
