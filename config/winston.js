var appRoot = require('app-root-path');
var winston = require('winston');

// define the custom settings for each transport (file, console)
// intentionally made as Warn and error to avoid anyother logs which are not needed.
var options = {
  file: {
    level: 'warn',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 1073741824, // 1GB
    maxFiles: 10,
    colorize: false,
    timestamp: true,
  },
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
    timestamp: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
  var logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`

logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
