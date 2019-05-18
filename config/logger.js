const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file")
const fs = require('fs')
const logDir = 'logs'

/**
 * 로그 기본 세팅
 * develop일경우 txt파일로 남기고 console에도 찍는다.
 * production일 경우 txt파일로만 남기고 console엔 찍지않는다
 */
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