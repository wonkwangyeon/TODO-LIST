const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file")
const fs = require('fs')
const logDir = 'logs'

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

process.env.NODE_ENV // "development"
const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.json()
    ),
    transports: [
        new transports.DailyRotateFile({
            filename: `${logDir}/%DATE%-info.log`,
            datePattern: "YYYY-MM-DD",
            level: 'info',
            maxSize: "20m",
            maxFiles: "14d"
        }),
        new transports.DailyRotateFile({
            filename: `${logDir}/%DATE%-error.log`,
            datePattern: "YYYY-MM-DD",
            level: 'error',
            maxSize: "20m",
            maxFiles: "14d"
        })
    ]
})

logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};


if (process.env.NODE_ENV !== "production") {
    logger.add(new transports.Console({
        level: "debug",
        format: format.combine(
            format.colorize(),
            format.printf(
                info => `${info.timestamp} ${info.level}: ${info.message}`
            )
        )
    }))
}


module.exports = logger;