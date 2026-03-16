import type { Request, Response } from "express";
import { checkDbConnection, checkHasData } from "../services/health.service";

// Handles GET /api/health with optional ?query=database|data filtering.
export async function healthController(req: Request, res: Response): Promise<void> {
    const { query } = req.query;

    if (query !== undefined && query !== "database" && query !== "data") {
        res.status(400).json({ error: "Invalid query parameter. Allowed values: database, data." });
        return;
    }

    if (query === "database") {
        const db_connected = await checkDbConnection();
        res.status(200).json({ db_connected });
        return;
    }

    if (query === "data") {
        const has_data = await checkHasData();
        res.status(200).json({ has_data });
        return;
    }

    const [db_connected, has_data] = await Promise.all([checkDbConnection(), checkHasData()]);
    res.status(200).json({ db_connected, has_data });
}