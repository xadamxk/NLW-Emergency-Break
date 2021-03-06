var appRoot = require('app-root-path');
var winston = require('winston');

// define the custom settings for each transport (file, console)
var options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/logfile.log' })
    ]
});

// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//     write: function (message, encoding) {
//         // use the 'info' log level so the output will be picked up by both transports (file and console)
//         logger.info(message);
//     },
// };

module.exports = logger;