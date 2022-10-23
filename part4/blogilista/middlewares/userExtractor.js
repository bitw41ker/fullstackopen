const jwt = require('jsonwebtoken');

const userExtractor = (req, res, next) => {
  try {
    const token = req.token;

    const decodedToken = token ? jwt.verify(token, process.env.SECRET) : null;

    if (decodedToken) {
      req.user = { id: decodedToken.id, username: decodedToken.username };
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
