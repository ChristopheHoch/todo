/* global exports, require */

var winston = require('winston'),
    config = require('./configuration'),
    logLevel = config.get("log:level"),
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: logLevel,
                timestamp: true
            })
        ]
    });

exports.winston = logger;