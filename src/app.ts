import express, { type NextFunction, type Request, type Response } from "express";
import healthRoutes from "./routes/health.routes";
import { requestLogger } from "./middleware/requestLogger";
import logger from "./config/logger";

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use("/api", healthRoutes);

// Catches any unhandled errors and returns a 500 without leaking internals.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(err.message, { stack: err.stack });
    res.status(500).json({ error: "Internal server error" });
});

export default app;