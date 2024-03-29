const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const tokenExtractor = require('../middlewares/tokenExtractor');
const userExtractor = require('../middlewares/userExtractor');

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

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res, next) => {
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
    next(error);
  }
});

blogsRouter.post('/:id/like', tokenExtractor, async (req, res, next) => {
  try {
    const token = req.token;

    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : false;
    if (!token || !decodedToken) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }

    const blog = await Blog.findById(req.params.id);
    blog.likes++;
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete(
  '/:id',
  tokenExtractor,
  userExtractor,
  async (req, res, next) => {
    try {
      const { token, user } = req;

      if (!token || !user) {
        return res.status(401).json({ error: 'token missing or invalid' });
      }

      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(400).json({ error: 'blog not found' });
      }
      if (blog.user.toString() === user.id) {
        const foundUser = await User.findById(user.id);
        const index = foundUser.notes.indexOf(blog._id);
        foundUser.notes.splice(index, 1);
        await foundUser.save();
        await blog.delete();
      } else {
        return res.status(401).json({ error: 'not authorized' });
      }

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

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
