jest.mock("../model/userModel", () => ({
  getUserById: jest.fn(),
}));

const request = require("supertest");
const app = require("../server");
const { getUserById } = require("../model/userModel");

describe("GET /api/getById/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should return user by id", async () => {
    getUserById.mockResolvedValue({
      id: 1,
      name: "John",
      email: "john@gmail.com",
    });

    const res = await request(app).get("/api/getById/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("successfully fetched");
    expect(res.body.user.name).toBe("John");
  });
  test("should return 404 if user does not exist", async () => {
    getUserById.mockResolvedValue(null);

    const res = await request(app).get("/api/getById/100");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("not found");
  });
  test("should return 500 if database throws error", async () => {
    getUserById.mockRejectedValue(new Error("Database Error"));

    const res = await request(app).get("/api/getById/1");

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("unsuccessful");
  });
});
