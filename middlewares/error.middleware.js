// 404 not found
const notFound = (request, response, next) => {
  const error = new Error(`404 not found ${request.originalUrl}`);

  response.status(404);

  next(error);
};

// error
const error = (error, request, response, next) => {
  const statusCode = response.statusCode || 500;

  response.status(statusCode);

  response.json({
    message: error?.message,
    stack: error?.stack,
  });
};

module.exports = { notFound, error };
