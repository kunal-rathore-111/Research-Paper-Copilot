

function errorHandler(err, req, res, next) {

    // Log the full error for debugging
    console.error(`\n========== ERROR ==========`);
    console.error(`Path: ${req.method} ${req.path}`);
    console.error(`Error:`, err);
    console.error(`Stack:`, err.stack);
    console.error(`===========================\n`);

    let status = err.status || 500;
    let message = err.message || 'Something went wrong';
    let type = err.type || 'Unknown error';

    // Handle MongoDB duplicate key error
    if (err.errorResponse && err.errorResponse.code === 11000) {
        status = 409;
        type = 'Conflict';
        message = 'Already exists';
    }

    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
        status = 400;
        type = 'ValidationError';
        message = Object.values(err.errors).map(e => e.message).join(', ');
    }

    // Handle MongoDB cast errors
    if (err.name === 'CastError') {
        status = 400;
        type = 'InvalidInput';
        message = 'Invalid ID format';
    }

    res.status(status).json({ 
        status: 'error', 
        message: message, 
        type: type,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });

}

module.exports = errorHandler;