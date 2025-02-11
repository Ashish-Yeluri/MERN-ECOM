

function errorMiddleWare(err, req, res, next) {
  let error = {
    statusCode: err.statusCode  || 500,
    message: err.message || 'Internal Server error',
  }
  if (process.env.NODE_ENV == 'DEVELOPMENT') {
    res.status(error.statusCode).json({
      error: err,
      stack: error.stack,
      message: error.message
    });
  }
  if (process.env.NODE_ENV == 'PRODUCTION') {
    res.status(error.statusCode).json({
      message: error.message
    })
  }

  res.status(error.statusCode).json({
    message: error.message
  })
}

module.exports = errorMiddleWare