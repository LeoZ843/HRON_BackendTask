import rateLimit from "express-rate-limit";

// Limits each IP to 1 request per 10 seconds on the health endpoint.
// Skipped in test environment to avoid interfering with unit tests.
export const healthRateLimiter = rateLimit({
    windowMs: 10 * 1000,
    limit: 1,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { error: "Too many requests, please try again later." },
    skip: () => process.env["NODE_ENV"] === "test",
});