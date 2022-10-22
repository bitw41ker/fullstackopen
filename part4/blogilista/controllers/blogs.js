const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    });

    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const users = await User.find({});

    const blog = new Blog({ ...request.body, user: users[0].id });
    const result = await blog.save();

    users[0].notes = users[0].notes.concat(result.id);
    await users[0].save();

    response.status(201).json(result);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    }
    next(error);
  }
});

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch('/:id', async (request, response, next) => {
  try {
    const { likes } = request.body;

    const blog = {
      likes,
    };

    const result = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });

    response.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
