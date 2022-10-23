const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const { blogs } = require('./helper');

const api = supertest(app);
const userLogin = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJpZCI6IjYzNTRmZWMxMzUwMmRhZWY4YzMyMzM5YyIsImlhdCI6MTY2NjU0NjczNX0.6MSmBu56YSPAgMVeH2cwmdwSud0wgxg633JVCzHyQ3o',
  username: 'test',
  name: 'Batman 2',
};

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});
  const blogObjects = blogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blogObject) => blogObject.save());
  await Promise.all(promises);
  const notesArr = blogs.map((blog) => blog._id);
  const user = new User({
    _id: '6354fec13502daef8c32339c',
    username: 'test',
    name: 'Batman 2',
    passwordHash:
      '$2b$10$PXDH0l5colUavnaSq1pZeeGPby0cr0508XbCeccF3XLyGklq104sy',
    notes: notesArr,
    __v: 0,
  });
  await user.save();
});

afterAll(() => {
  mongoose.connection.close();
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
  test('blog not added if authorization token is missing', async () => {
    const res = await api.post('/api/blogs').send({
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
    });

    expect(res.status).toEqual(401);

    const res2 = await Blog.find({
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
    });

    expect(res2).toEqual([]);
  });
  test('blog is added', async () => {
    const res = await api
      .post('/api/blogs')
      .send({
        title: 'Statement Considered',
        author: 'Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 8,
      })
      .set('Authorization', `Bearer ${userLogin.token}`);

    expect(res.status).toEqual(201);

    const res2 = await api.get('/api/blogs/');

    expect(res2.body).toHaveLength(blogs.length + 1);
    expect(res2.body[blogs.length]).toEqual({
      id: res2.body[blogs.length].id,
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      user: {
        id: res2.body[blogs.length].user.id,
        name: 'Batman 2',
        username: 'test',
      },
    });
  });
  test('if likes is not set, then dafault to 0', async () => {
    const res = await api
      .post('/api/blogs')
      .send({
        title: 'Statement Considered',
        author: 'Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      })
      .set('Authorization', `Bearer ${userLogin.token}`);

    const res2 = await api.get('/api/blogs/');

    expect(res2.body[blogs.length]).toEqual({
      id: res2.body[blogs.length].id,
      title: 'Statement Considered',
      author: 'Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 0,
      user: {
        id: res2.body[blogs.length].user.id,
        name: 'Batman 2',
        username: 'test',
      },
    });
  });

  test('if title and url is missing then receive status 400', async () => {
    const res = await api
      .post('/api/blogs')
      .send({
        author: 'Dijkstra',
      })
      .set('Authorization', `Bearer ${userLogin.token}`);

    expect(res.status).toEqual(400);
  });
});

describe('DELETE /blogs/:id', () => {
  test('blog deleted', async () => {
    const res = await api
      .delete('/api/blogs/5a422b3a1b54a676234d17f9')
      .set('Authorization', `Bearer ${userLogin.token}`);
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
      user: '6354fec13502daef8c32339c',
    });

    const res2 = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');
    expect(res2.body).toEqual({
      id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 456,
      user: {
        id: '6354fec13502daef8c32339c',
        name: 'Batman 2',
        username: 'test',
      },
    });
  });
});
