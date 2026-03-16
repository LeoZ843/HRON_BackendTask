import { Router } from "express";
import { healthRateLimiter } from "../middleware/rateLimiter";
import { healthController } from "../controllers/health.controller";

const router = Router();

router.get("/health", healthRateLimiter, healthController);

export default router;