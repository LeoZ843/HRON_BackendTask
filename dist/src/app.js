"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const requestLogger_1 = require("./middleware/requestLogger");
const logger_1 = __importDefault(require("./config/logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(requestLogger_1.requestLogger);
app.use("/api", health_routes_1.default);
// Catches any unhandled errors and returns a 500 without leaking internals.
app.use((err, _req, res, _next) => {
    logger_1.default.error(err.message, { stack: err.stack });
    res.status(500).json({ error: "Internal server error" });
});
exports.default = app;
//# sourceMappingURL=app.js.map