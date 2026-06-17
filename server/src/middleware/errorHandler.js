export function notFound(_req, _res, next) {
  const error = new Error('Requested API route was not found.')
  error.status = 404
  next(error)
}

export function errorHandler(error, _req, res, _next) {
  const status = error.status || 500

  res.status(status).json({
    success: false,
    message: error.message || 'An unexpected server error occurred.',
  })
}
