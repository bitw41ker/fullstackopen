const listHelper = require('../utils/list_helper');
const { blogs } = require('./helper');

const emptyList = [];

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('list has many blogs', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favorite blog', () => {
  test('list has many blogs', () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: '6354fec13502daef8c32339c',
      __v: 0,
    });
  });
});

describe('most blogs', () => {
  test('list has no blogs', () => {
    const result = listHelper.mostBlogs(emptyList);
    expect(result).toEqual({ author: '', blogs: 0 });
  });
  test('list has one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
  test('list has many blogs', () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
});

describe('most likes', () => {
  test('list has no blogs', () => {
    const result = listHelper.mostLikes(emptyList);
    expect(result).toEqual({ author: '', likes: 0 });
  });
  test('list has one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });
  test('list has many blogs', () => {
    const result = listHelper.mostLikes(blogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });
});

module.exports = blogs;
