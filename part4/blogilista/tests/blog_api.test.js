const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const { blogs } = require('./helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promises);
});

test('all blogs are returned', async () => {
  const res = await api.get('/api/blogs');

  expect(res.body).toHaveLength(blogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
