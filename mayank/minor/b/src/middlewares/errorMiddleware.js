function errorHandler(err, req, res, next) {
    console.error('\n--- Error ---\n', err, '\n--------------\n');

    let status = err.status || 500, message = err.message || 'Something wrong', type = err.type || 'Unknown error';

    if (err.errorResponse && err.errorResponse.code === 11000) {
        status = 409;
        type = 'Conflict';
        message = 'Already exists';
    }

    res.status(status).json({ status: 'error', message, type });
}

module.exports = errorHandler;