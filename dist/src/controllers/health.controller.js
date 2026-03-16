"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = healthController;
const health_service_1 = require("../services/health.service");
// Handles GET /api/health with optional ?query=database|data filtering.
async function healthController(req, res) {
    const { query } = req.query;
    if (query !== undefined && query !== "database" && query !== "data") {
        res.status(400).json({ error: "Invalid query parameter. Allowed values: database, data." });
        return;
    }
    if (query === "database") {
        const db_connected = await (0, health_service_1.checkDbConnection)();
        res.status(200).json({ db_connected });
        return;
    }
    if (query === "data") {
        const has_data = await (0, health_service_1.checkHasData)();
        res.status(200).json({ has_data });
        return;
    }
    const [db_connected, has_data] = await Promise.all([(0, health_service_1.checkDbConnection)(), (0, health_service_1.checkHasData)()]);
    res.status(200).json({ db_connected, has_data });
}
//# sourceMappingURL=health.controller.js.map