import { createLogger, format, transports } from "winston";

// Structured logger — logs down to http level in production to capture request logs.
const logger = createLogger({
    level: process.env["NODE_ENV"] === "production" ? "http" : "debug",
    format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [new transports.Console()],
});

export default logger;