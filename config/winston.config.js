const winston = require('winston');

// Create a logger with desired configuration
const logger = winston.createLogger({
    level: winston.config.syslog.levels, // Set the log level
    format: winston.format.simple(), // Specify log message format
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'logfile.log' }) // Log to a file
    ],
    handleExceptions: true,
    handleRejections: true,
});

// Add console as a transport when node environment is dev or test
const consoleTransport = new winston.transports.Console({
    format: winston.format.simple(),
});

// Enable logs to console only in development
if (process.env.NODE_ENV !== "production") logger.add(consoleTransport);

logger.stream = {
    write: function (message) {
        logger.info(message);
    }
}

// // Log messages at different levels
// logger.error('An error occurred');
// logger.warn('A warning message');
// logger.info('An informational message');
// logger.debug('A debug message');

module.exports = logger;