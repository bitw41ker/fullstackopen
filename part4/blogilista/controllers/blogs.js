const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });

    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', {
      username: 1,
      name: 1,
    });

    res.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  try {
    const { title, author, likes, url } = req.body;
    const token = req.token;

    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : false;
    if (!token || !decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({ title, author, likes, url, user: user.id });
    const savedBlog = await blog.save();

    user.notes = user.notes.concat(savedBlog.id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token' });
    }
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch('/:id', async (req, res, next) => {
  try {
    const { likes } = req.body;

    const blog = {
      likes,
    };

    const result = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
