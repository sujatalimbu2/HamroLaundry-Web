jest.mock("../model/userModel", () => ({
  deleteById: jest.fn(),
}));

const request = require("supertest");
const app = require("../server");
const { deleteById } = require("../model/userModel");

describe("GET /api/deleteUserById/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Delete user successfully
  test("should delete user successfully", async () => {
    deleteById.mockResolvedValue({
      id: 1,
      name: "John",
    });

    const res = await request(app).get("/api/deleteUserById/1");

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("user deleted successfully");
  });

  // Test 2: User not found
  test("should return 404 if user not found", async () => {
    deleteById.mockResolvedValue(null);

    const res = await request(app).get("/api/deleteUserById/999");

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("user not found");
  });

  // Test 3: Invalid ID
  test("should return 404 for invalid id", async () => {
    deleteById.mockResolvedValue(null);

    const res = await request(app).get("/api/deleteUserById/abc");

    expect(res.statusCode).toBe(404);
  });

  // Test 4: Database error
  test("should return 500 if database fails", async () => {
    deleteById.mockRejectedValue(new Error("Database Error"));

    const res = await request(app).get("/api/deleteUserById/1");

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("server error");
  });

  // Test 5: Delete function called correctly
  test("should call deleteById with correct id", async () => {
    deleteById.mockResolvedValue({
      id: 1,
    });

    await request(app).get("/api/deleteUserById/1");

    expect(deleteById).toHaveBeenCalledWith("1");
  });

  // Test 6: Deleted user returned
  test("should return deleted user", async () => {
    const user = {
      id: 1,
      name: "John",
      email: "john@gmail.com",
    };

    deleteById.mockResolvedValue(user);

    const res = await request(app).get("/api/deleteUserById/1");

    expect(res.body.user).toEqual(user);
  });
});