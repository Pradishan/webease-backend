const asyncMiddleware = (callback) => (req, res, next) =>
  callback(req, res, next).catch((err) => next(err));

export default asyncMiddleware;
