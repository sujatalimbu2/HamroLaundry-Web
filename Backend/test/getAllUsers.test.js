jest.mock("../model/userModel", () => ({
  getAllUser: jest.fn(),
}));

jest.mock("../middleware/verifyToken", () => ({
  verifyToken: (req, res, next) => next(),
}));

jest.mock("../middleware/authMiddleware", () => ({
  isAdmin: (req, res, next) => next(),
}));

const request = require("supertest");
const app = require("../server");
const { getAllUser } = require("../model/userModel");

describe("GET /api/getAll", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return all users", async () => {
    getAllUser.mockResolvedValue([
      {
        id: 1,
        name: "John",
        email: "john@gmail.com",
      },
    ]);

    const res = await request(app).get("/api/getAll");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("successful");
    expect(res.body.user.length).toBe(1);
  });

  test("should return 400 when no users are found", async () => {
    getAllUser.mockResolvedValue([]);

    const res = await request(app).get("/api/getAll");

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("user is not present");
  });
  test("should return 500 if database throws an error", async () => {
    getAllUser.mockRejectedValue(new Error("Database Error"));

    const res = await request(app).get("/api/getAll");

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("unsuccessful");
  });
});
