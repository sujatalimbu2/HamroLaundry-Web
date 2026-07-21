jest.mock("../model/userModel", () => ({
  existingUser: jest.fn(),
  saveResetToken: jest.fn(),
}));

jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

const request = require("supertest");
const app = require("../server");

const nodemailer = require("nodemailer");
const { existingUser, saveResetToken } = require("../model/userModel");

describe("POST /api/forgot-password", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should send password reset email", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
    });

    saveResetToken.mockResolvedValue({});

    const sendMail = jest.fn().mockResolvedValue(true);

    nodemailer.createTransport.mockReturnValue({
      sendMail,
    });

    const res = await request(app).post("/api/forgot-password").send({
      email: "john@gmail.com",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Password reset email sent");
  });
  test("should return 400 if email is missing", async () => {
    const res = await request(app).post("/api/forgot-password").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email is required");
  });

  test("should return 404 if email is not registered", async () => {
    existingUser.mockResolvedValue(null);

    const res = await request(app).post("/api/forgot-password").send({
      email: "unknown@gmail.com",
    });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe("Email not registered");
  });
  test("should save reset token", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
    });

    saveResetToken.mockResolvedValue({});

    const sendMail = jest.fn().mockResolvedValue(true);

    nodemailer.createTransport.mockReturnValue({
      sendMail,
    });

    await request(app).post("/api/forgot-password").send({
      email: "john@gmail.com",
    });

    expect(saveResetToken).toHaveBeenCalled();
  });

  test("should return 500 if email sending fails", async () => {
  existingUser.mockResolvedValue({
    id: 1,
    email: "john@gmail.com",
  });

  saveResetToken.mockResolvedValue({});

  const sendMail = jest.fn().mockRejectedValue(new Error("Email failed"));

  nodemailer.createTransport.mockReturnValue({
    sendMail,
  });

  const res = await request(app)
    .post("/api/forgot-password")
    .send({
      email: "john@gmail.com",
    });

  expect(res.statusCode).toBe(500);
});

test("should return 500 if database error occurs", async () => {
  existingUser.mockRejectedValue(new Error("Database error"));

  const res = await request(app)
    .post("/api/forgot-password")
    .send({
      email: "john@gmail.com",
    });

  expect(res.statusCode).toBe(500);
});
});
