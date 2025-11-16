
function asyncWrapper(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next); // it tries the route if having any error it will call the global error middleware via catch
    }
}

module.exports = asyncWrapper;