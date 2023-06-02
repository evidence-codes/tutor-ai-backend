const winston = require('winston');

// Create a logger with desired configuration
const logger = winston.createLogger({
    level: winston.config.syslog.levels, // Set the log level
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ), // Specify log message format
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

logger.add(consoleTransport);

logger.stream = {
    write: function (message) {
        logger.info(message);
    }
}

module.exports = logger;