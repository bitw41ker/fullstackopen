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

describe('GET /blogs', () => {
  test('all blogs are returned', async () => {
    const res = await api.get('/api/blogs').set('Accept', 'application/json');

    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.status).toEqual(200);
    expect(res.body).toHaveLength(blogs.length);
  });

  test('blog identifiers field is id and not _id', async () => {
    const res = await api.get('/api/blogs');

    expect(res.body[0].id).toBeDefined();
    expect(res.body[0]._id).not.toBeDefined();
  });
});

describe('POST /blogs', () => {
  test('blog is added', async () => {
    const res = await api.post('/api/blogs').send({
      _id: '5a433b3a1b54a676234d17f9',
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
    });

    expect(res.status).toEqual(201);

    const res2 = await api.get('/api/blogs/');

    expect(res2.body).toHaveLength(blogs.length + 1);
    expect(res2.body[blogs.length]).toEqual({
      id: '5a433b3a1b54a676234d17f9',
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
    });
  });
  test('if likes is not set, then dafault to 0', async () => {
    const res = await api.post('/api/blogs').send({
      _id: '5a433b3a1b54a676234d17f9',
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    });

    const res2 = await api.get('/api/blogs/');

    expect(res2.body[blogs.length]).toEqual({
      id: '5a433b3a1b54a676234d17f9',
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
    });
  });

  test('if title and url is missing then receive status 400', async () => {
    const res = await api.post('/api/blogs').send({
      _id: '5a433b3a1b54a676234d17f9',
      author: 'Dijkstra',
    });

    expect(res.status).toEqual(400);
  });
});

describe('DELETE /blogs/:id', () => {
  test('blog deleted', async () => {
    const res = await api.delete('/api/blogs/5a422b3a1b54a676234d17f9');
    expect(res.status).toEqual(204);

    const res2 = await api.get('/api/blogs');
    expect(res2.body).toHaveLength(blogs.length - 1);
    res2.body.forEach((blog) =>
      expect(blog.id).not.toBe('5a422b3a1b54a676234d17f9')
    );
  });
});

describe('PATCH /blogs/:id', () => {
  test('blog updated', async () => {
    const res = await api.patch('/api/blogs/5a422b3a1b54a676234d17f9').send({
      likes: 456,
    });
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 456,
    });

    const res2 = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');
    expect(res2.body).toEqual({
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 456,
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});