jest.mock("../model/userModel", () => ({
  existingUser: jest.fn(),
}));

jest.mock("bcrypt");

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const request = require("supertest");
const app = require("../server");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { existingUser } = require("../model/userModel");

describe("POST /api/login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should login successfully", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      name: "John",
      email: "john@gmail.com",
      password: "hashedpassword",
      role: "user",
      address: "Kathmandu",
      contact: "9812345678",
      image: null,
    });

    bcrypt.compare.mockResolvedValue(true);

    JWT.sign.mockReturnValue("fake_token");

    const res = await request(app).post("/api/login").send({
      email: "john@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body.token).toBe("fake_token");
  });

  test("should return 400 if email is missing", async () => {
    const res = await request(app).post("/api/login").send({
      password: "123456",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Field empty");
  });
  test("should return 400 if password is missing", async () => {
    const res = await request(app).post("/api/login").send({
      email: "john@gmail.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Field empty");
  });
  test("should return 400 if email is not registered", async () => {
    existingUser.mockResolvedValue(null);

    const res = await request(app).post("/api/login").send({
      email: "john@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("email is not register");
  });
  test("should return password doesnt matched", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
      password: "hashedpassword",
    });

    bcrypt.compare.mockResolvedValue(false);

    const res = await request(app).post("/api/login").send({
      email: "john@gmail.com",
      password: "wrongpassword",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("password doesnt matched");
  });
  test("should return 500 if database throws error", async () => {
    existingUser.mockRejectedValue(new Error("Database Error"));

    const res = await request(app).post("/api/login").send({
      email: "john@gmail.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(500);
  });
});
