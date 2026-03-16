import morgan from "morgan";
import logger from "../config/logger";

// Pipes morgan HTTP request logs into winston.
const stream = {
    write: (message: string) => logger.http(message.trim()),
};

export const requestLogger = morgan("combined", { stream });