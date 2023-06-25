const { BaseError } = require('../errors/httpErrors');
// const customLogger = require("../config/winston.config");

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    if (err instanceof BaseError)
        return res.status(err.statusCode).json(formatError(err.message));

    res.status(500).json(formatError('Internal Server Error'));
}

// function errorLogger(err, req, res, next) {
//     // Only log operational error not HTTP errors
//     if (err instanceof BaseError) return next(err);

//     customLogger.error(err.message, err);
//     next(err);
// }

function formatError(message) {
    return { message, sucess: false };
}

module.exports = { errorHandler, formatError };
