import request from "supertest";
import app from "../src/app";
import * as healthService from "../src/services/health.service";

jest.mock("../src/services/health.service");

const mockedCheckDbConnection = jest.mocked(healthService.checkDbConnection);
const mockedCheckHasData = jest.mocked(healthService.checkHasData);

describe("GET /api/health", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("no query parameter", () => {
        it("returns db_connected and has_data when both are true", async () => {
            mockedCheckDbConnection.mockResolvedValue(true);
            mockedCheckHasData.mockResolvedValue(true);

            const res = await request(app).get("/api/health");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: true, has_data: true });
        });

        it("returns db_connected and has_data when both are false", async () => {
            mockedCheckDbConnection.mockResolvedValue(false);
            mockedCheckHasData.mockResolvedValue(false);

            const res = await request(app).get("/api/health");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: false, has_data: false });
        });
    });

    describe("?query=database", () => {
        it("returns only db_connected", async () => {
            mockedCheckDbConnection.mockResolvedValue(true);

            const res = await request(app).get("/api/health?query=database");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: true });
            expect(mockedCheckHasData).not.toHaveBeenCalled();
        });
    });

    describe("?query=data", () => {
        it("returns only has_data", async () => {
            mockedCheckHasData.mockResolvedValue(true);

            const res = await request(app).get("/api/health?query=data");

            expect(res.status).toBe(200);
            expect(res.body).toEqual({ has_data: true });
            expect(mockedCheckDbConnection).not.toHaveBeenCalled();
        });
    });

    describe("invalid query parameter", () => {
        it("returns 400 for an unrecognised query value", async () => {
            const res = await request(app).get("/api/health?query=invalid");

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error");
        });
    });
});