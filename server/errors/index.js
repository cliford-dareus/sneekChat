const BadRequest = require('./bad-request');
const UnauthenticatedError = require('./authenticated');
// const UnauthorizedError = require('./unauthorized');
const NotFoundError = require('./not-found');
module.exports = {
    BadRequest,
    // UnauthorizedError,
    NotFoundError,
    UnauthenticatedError
};