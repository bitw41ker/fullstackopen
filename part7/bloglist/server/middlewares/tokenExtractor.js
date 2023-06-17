const tokenExtractor = (req, res, next) => {
  try {
    const authorization = req.get('authorization');
    if (authorization?.toLowerCase().startsWith('bearer ')) {
      req.token = authorization.substring(7);
    } else {
      req.token = null;
    }

    next();
  } catch (error) {
    next(eror);
  }
};

module.exports = tokenExtractor;
