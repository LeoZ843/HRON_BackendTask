"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
// Structured logger — logs down to http level in production to capture request logs.
const logger = (0, winston_1.createLogger)({
    level: process.env["NODE_ENV"] === "production" ? "http" : "debug",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    transports: [new winston_1.transports.Console()],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map