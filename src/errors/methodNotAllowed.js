function methodNotAllowed(req, res, next){
  next({
    status: 405,
    message: `${req.query} not allowed on ${req.originalUrl}`
  })
}

module.exports = methodNotAllowed;
