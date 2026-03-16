"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDbConnection = checkDbConnection;
exports.checkHasData = checkHasData;
const db_1 = require("../config/db");
// Checks whether the database is reachable by running a lightweight query.
async function checkDbConnection() {
    try {
        await db_1.prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch {
        return false;
    }
}
// Checks whether at least one record exists in the task table.
async function checkHasData() {
    const count = await db_1.prisma.task.count();
    return count > 0;
}
//# sourceMappingURL=health.service.js.map