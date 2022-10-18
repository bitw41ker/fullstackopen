const blogsRouter = require('express').Router();
const { find } = require('../models/blog');
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({});

    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const result = await blog.save();

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
