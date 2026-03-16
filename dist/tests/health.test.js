"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const healthService = __importStar(require("../src/services/health.service"));
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
            const res = await (0, supertest_1.default)(app_1.default).get("/api/health");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: true, has_data: true });
        });
        it("returns db_connected and has_data when both are false", async () => {
            mockedCheckDbConnection.mockResolvedValue(false);
            mockedCheckHasData.mockResolvedValue(false);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/health");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: false, has_data: false });
        });
    });
    describe("?query=database", () => {
        it("returns only db_connected", async () => {
            mockedCheckDbConnection.mockResolvedValue(true);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/health?query=database");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ db_connected: true });
            expect(mockedCheckHasData).not.toHaveBeenCalled();
        });
    });
    describe("?query=data", () => {
        it("returns only has_data", async () => {
            mockedCheckHasData.mockResolvedValue(true);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/health?query=data");
            expect(res.status).toBe(200);
            expect(res.body).toEqual({ has_data: true });
            expect(mockedCheckDbConnection).not.toHaveBeenCalled();
        });
    });
    describe("invalid query parameter", () => {
        it("returns 400 for an unrecognised query value", async () => {
            const res = await (0, supertest_1.default)(app_1.default).get("/api/health?query=invalid");
            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty("error");
        });
    });
});
//# sourceMappingURL=health.test.js.map