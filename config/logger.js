const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file")
const fs = require('fs')
const logDir = 'logs'

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
        new transports.DailyRotateFile({
            filename: `${logDir}/%DATE%.log`,
            datePattern: "YYYY-MM-DD",
            level: 'info',
            maxSize: "20m",
            maxFiles: "14d"
        })
    ]
})

module.exports = logger;
