function notFound(req, res, next) {
  next({
    status: 404,
    message: `${req.originalUrl} cannot be found.`
  })
}

module.exports = notFound;
