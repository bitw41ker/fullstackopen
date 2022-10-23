const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
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
    const { title, author, likes, url } = request.body;
    const token = request.token;

    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : false;
    if (!token || !decodedToken) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, author, likes, url, user: user.id });
    const savedBlog = await blog.save();

    user.notes = user.notes.concat(savedBlog.id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({ error: 'invalid token' });
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
