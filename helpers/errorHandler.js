module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string' && res) {
    // custom application error
    return res.status(400).json({message: err});
  }

  if (err.name === 'ValidationError'&& res) {
    // mongoose validation error
    return res.status(400).json({message: err.message});
  }

  if (err.name === 'UnauthorizedError'&& res) {
    // jwt authentication error
    return res.status(401).json({message: 'Unauthenticated'});
  }

  // default to 500 server error
  if (res) {
    return res.status(500).json({message: err.message});
  }
  return err.message
}
