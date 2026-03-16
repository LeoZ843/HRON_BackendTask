"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRateLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// Limits each IP to 1 request per 10 seconds on the health endpoint.
// Skipped in test environment to avoid interfering with unit tests.
exports.healthRateLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 1000,
    limit: 1,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
    skip: () => process.env["NODE_ENV"] === "test",
});
//# sourceMappingURL=rateLimiter.js.map