jest.mock("../model/userModel", () => ({
  getUserById: jest.fn(),
  updatePassword: jest.fn(),
}));

jest.mock("bcrypt");

const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcrypt");

const {
  getUserById,
  updatePassword,
} = require("../model/userModel");

describe("PUT /api/updatePassword/:id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Password updated successfully
  test("should update password successfully", async () => {
    getUserById.mockResolvedValue({
      id: 1,
      password: "oldHashedPassword",
    });

    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue("newHashedPassword");
    updatePassword.mockResolvedValue({});

    const res = await request(app)
      .put("/api/updatePassword/1")
      .send({
        currentPassword: "123456",
        newPassword: "654321",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password updated successfully");
  });

  // Test 2: User not found
  test("should return 404 if user not found", async () => {
    getUserById.mockResolvedValue(null);

    const res = await request(app)
      .put("/api/updatePassword/999")
      .send({
        currentPassword: "123456",
        newPassword: "654321",
      });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("User not found");
  });

  // Test 3: Current password incorrect
  test("should return 400 if current password is incorrect", async () => {
    getUserById.mockResolvedValue({
      id: 1,
      password: "hashedPassword",
    });

    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app)
      .put("/api/updatePassword/1")
      .send({
        currentPassword: "wrongpassword",
        newPassword: "654321",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Current password is incorrect");
  });

  // Test 4: Hash password
  test("should hash the new password", async () => {
    getUserById.mockResolvedValue({
      id: 1,
      password: "hashedPassword",
    });

    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue("newHashedPassword");
    updatePassword.mockResolvedValue({});

    await request(app)
      .put("/api/updatePassword/1")
      .send({
        currentPassword: "123456",
        newPassword: "654321",
      });

    expect(bcrypt.hash).toHaveBeenCalledWith("654321", 10);
  });

  // Test 5: Update password function called
  test("should call updatePassword with hashed password", async () => {
    getUserById.mockResolvedValue({
      id: 1,
      password: "hashedPassword",
    });

    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue("newHashedPassword");
    updatePassword.mockResolvedValue({});

    await request(app)
      .put("/api/updatePassword/1")
      .send({
        currentPassword: "123456",
        newPassword: "654321",
      });

    expect(updatePassword).toHaveBeenCalledWith(
      "1",
      "newHashedPassword"
    );
  });

  // Test 6: Server error
  test("should return 500 if server error occurs", async () => {
    getUserById.mockRejectedValue(new Error("Database Error"));

    const res = await request(app)
      .put("/api/updatePassword/1")
      .send({
        currentPassword: "123456",
        newPassword: "654321",
      });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Server error");
  });
});