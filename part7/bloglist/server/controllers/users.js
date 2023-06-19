const bcrypt = require('bcrypt');
const { response } = require('express');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: 'username already exists',
      });
    }

    if (!password || password.length < 3) {
      const e = new Error();
      e.name = 'ValidationError';
      throw e;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'username or password invalid' });
    }
    next(error);
  }
});

router.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('notes', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
      id: 1,
    });
    response.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const user = await User.findById(id).populate('notes', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
      id: 1,
    });
    response.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
