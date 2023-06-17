const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    let passwordOk;
    if (user) {
      passwordOk = await bcrypt.compare(password, user.passwordHash);
    }

    if (!user || !passwordOk) {
      return res.status(401).json({
        error: 'invalid username or password',
      });
    }

    const userToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userToken, process.env.SECRET);

    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
