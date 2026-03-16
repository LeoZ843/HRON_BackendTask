import type { Config } from "jest";

const config = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: ".",
    testMatch: ["**/tests/**/*.test.ts"],
    moduleNameMapper: {
        "^../../generated/prisma/client$": "<rootDir>/generated/prisma/client",
    },
    testEnvironmentOptions: {
        env: {
            NODE_ENV: "test",
        },
    },
};

export default config;