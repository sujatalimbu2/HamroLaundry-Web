jest.mock("../model/userModel", () => ({
  findUserByResetToken: jest.fn(),
  updatePassword: jest.fn(),
  clearResetToken: jest.fn(),
}));

jest.mock("bcrypt");

const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcrypt");

const {
  findUserByResetToken,
  updatePassword,
  clearResetToken,
} = require("../model/userModel");

describe("POST /api/reset-password/:token", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should reset password successfully", async () => {
    findUserByResetToken.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
    });

    bcrypt.hash.mockResolvedValue("hashedPassword");

    updatePassword.mockResolvedValue({});

    clearResetToken.mockResolvedValue({});

    const res = await request(app).post("/api/reset-password/testtoken").send({
      password: "newpassword123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset successfully");
  });

  test("should return 400 if password is missing", async () => {
    const res = await request(app)
      .post("/api/reset-password/testtoken")
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Password is required");
  });

  test("should return 400 if token is invalid", async () => {
    findUserByResetToken.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/reset-password/invalidtoken")
      .send({
        password: "newpassword123",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Invalid or expired reset link");
  });

  test("should hash the new password", async () => {
    findUserByResetToken.mockResolvedValue({
      id: 1,
    });

    bcrypt.hash.mockResolvedValue("hashedPassword");

    updatePassword.mockResolvedValue({});
    clearResetToken.mockResolvedValue({});

    await request(app).post("/api/reset-password/testtoken").send({
      password: "newpassword123",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("newpassword123", 10);
  });

  test("should clear reset token after password reset", async () => {
    findUserByResetToken.mockResolvedValue({
      id: 1,
    });

    bcrypt.hash.mockResolvedValue("hashedPassword");

    updatePassword.mockResolvedValue({});
    clearResetToken.mockResolvedValue({});

    await request(app).post("/api/reset-password/testtoken").send({
      password: "newpassword123",
    });

    expect(clearResetToken).toHaveBeenCalledWith(1);
  });

  test("should return 500 if server error occurs", async () => {
    findUserByResetToken.mockRejectedValue(new Error("Database error"));

    const res = await request(app).post("/api/reset-password/testtoken").send({
      password: "newpassword123",
    });

    expect(res.statusCode).toBe(500);
  });
});
