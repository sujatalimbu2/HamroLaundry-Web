jest.mock("../model/userModel", () => ({
  updateUser: jest.fn(),
}));

jest.mock("../middleware/uploads", () => ({
  single: () => (req, res, next) => {
    req.file = null;
    next();
  },
}));

const request = require("supertest");
const app = require("../server");
const { updateUser } = require("../model/userModel");

describe("PUT /api/updateUser/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Update user successfully
  test("should update user successfully", async () => {
    const user = {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "Kathmandu",
      contact: "9812345678",
    };

    updateUser.mockResolvedValue(user);

    const res = await request(app)
      .put("/api/updateUser/1")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: "Kathmandu",
        contact: "9812345678",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("User updated successfully");
  });

  // Test 2: User not found
  test("should return 404 if user not found", async () => {
    updateUser.mockResolvedValue(null);

    const res = await request(app)
      .put("/api/updateUser/999")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: "Kathmandu",
        contact: "9812345678",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  // Test 3: Database error
  test("should return 500 if database fails", async () => {
    updateUser.mockRejectedValue(new Error("Database Error"));

    const res = await request(app)
      .put("/api/updateUser/1")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: "Kathmandu",
        contact: "9812345678",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server error");
  });

  // Test 4: Check function call
  test("should call updateUser with correct values", async () => {
    updateUser.mockResolvedValue({
      id: 1,
      name: "John",
    });

    await request(app)
      .put("/api/updateUser/1")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: "Kathmandu",
        contact: "9812345678",
      });

    expect(updateUser).toHaveBeenCalledWith(
      "1",
      "John",
      "john@gmail.com",
      "Kathmandu",
      "9812345678",
      null
    );
  });

  // Test 5: Return updated user
  test("should return updated user", async () => {
    const user = {
      id: 1,
      name: "John Updated",
      email: "john@gmail.com",
      address: "Pokhara",
      contact: "9800000000",
    };

    updateUser.mockResolvedValue(user);

    const res = await request(app)
      .put("/api/updateUser/1")
      .send({
        name: "John Updated",
        email: "john@gmail.com",
        address: "Pokhara",
        contact: "9800000000",
      });

    expect(res.body.user).toEqual(user);
  });

  // Test 6: Update without image
  test("should update user without image", async () => {
    updateUser.mockResolvedValue({
      id: 1,
      image: null,
    });

    const res = await request(app)
      .put("/api/updateUser/1")
      .send({
        name: "John",
        email: "john@gmail.com",
        address: "Kathmandu",
        contact: "9812345678",
      });

    expect(res.statusCode).toBe(200);
  });
});