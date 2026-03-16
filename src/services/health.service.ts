import { prisma } from "../config/db";

// Checks whether the database is reachable by running a lightweight query.
export async function checkDbConnection(): Promise<boolean> {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return true;
    } catch {
        return false;
    }
}

// Checks whether at least one record exists in the task table.
export async function checkHasData(): Promise<boolean> {
    const count = await prisma.task.count();
    return count > 0;
}