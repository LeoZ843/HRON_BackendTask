import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env["DATABASE_URL"]! });
const prisma = new PrismaClient({ adapter });

// Inserts sample tasks so the health endpoint returns has_data: true on a fresh setup.
async function main(): Promise<void> {
    await prisma.task.createMany({
        data: [
            {
                brief: "Set up project structure",
                description: "Initialize the Node.js/TypeScript project with Express, Prisma, and PostgreSQL.",
            },
            {
                brief: "Implement health endpoint",
                description: "Build GET /api/health with database connection check and data presence check.",
            },
        ],
        skipDuplicates: true,
    });

    console.log("Seed complete.");
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());