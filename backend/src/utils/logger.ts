import winston, { format, transports } from "winston";

const logger = winston.createLogger({
  format: format.combine(
    format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: "realtime-chat-backend" },
  transports: [
    new winston.transports.File({
      filename: "logs/errors.log",
      level: "errors",
    }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf((i) => `[${i.level}] [${i.timestamp}] ${i.message}`)
      ),
      level: "verbose",
    })
  );
}

export default logger;
