"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rateLimiter_1 = require("../middleware/rateLimiter");
const health_controller_1 = require("../controllers/health.controller");
const router = (0, express_1.Router)();
router.get("/health", rateLimiter_1.healthRateLimiter, health_controller_1.healthController);
exports.default = router;
//# sourceMappingURL=health.routes.js.map