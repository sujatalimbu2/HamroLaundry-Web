jest.mock("../model/userModel", () => ({
  createUser: jest.fn(),
  existingUser: jest.fn(),
}));

jest.mock("bcrypt");

jest.mock("../middleware/uploads", () => ({
  single: () => (req, res, next) => {
    req.file = null;
    next();
  },
}));

const request = require("supertest");
const app = require("../server");

const bcrypt = require("bcrypt");

const { createUser, existingUser } = require("../model/userModel");

describe("POST /api/create", () => {
  test("should create a new user successfully", async () => {
    existingUser.mockResolvedValue(null);

    bcrypt.hash.mockResolvedValue("hashedpassword");

    createUser.mockResolvedValue({
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "Kathmandu",
      contact: "9812345678",
      image: null,
    });

    const res = await request(app).post("/api/create").send({
      name: "John",
      email: "john@gmail.com",
      password: "123456",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Created successful");
  });
  test("should return 400 if name is missing", async () => {
    const res = await request(app).post("/api/create").send({
      email: "john@gmail.com",
      password: "123456",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Field empty");
  });
  test("should return 400 if email is missing", async () => {
    const res = await request(app).post("/api/create").send({
      name: "John",
      password: "123456",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Field empty");
  });
  test("should return 400 if password is missing", async () => {
    const res = await request(app).post("/api/create").send({
      name: "John",
      email: "john@gmail.com",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Field empty");
  });
  test("should return 400 if email already exists", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
    });

    const res = await request(app).post("/api/create").send({
      name: "John",
      email: "john@gmail.com",
      password: "123456",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already registered");
  });
  test("should return 400 if email already exists", async () => {
    existingUser.mockResolvedValue({
      id: 1,
      email: "john@gmail.com",
    });

    const res = await request(app).post("/api/create").send({
      name: "John",
      email: "john@gmail.com",
      password: "123456",
      address: "Kathmandu",
      contact: "9812345678",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Email already registered");
  });
});
