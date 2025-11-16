

function errorHandler(err, req, res, next) {

    console.log(`\n\n\n ----------${JSON.stringify(err)}----------\n\n\n `);

    let status = err.status || 500, message = err.message || 'Something wrong', type = err.type || 'Unknown error';

    if (err.errorResponse && err.errorResponse.code === 11000) {    // when user tries to create acc even skip the debounce route 
        status = 409;
        type = 'Conflict';
        message = 'Already exists';
    }

    res.status(status).json({ status: 'error', message: message, type: type });

}

module.exports = errorHandler;