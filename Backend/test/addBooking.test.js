jest.mock("../model/bookingModel", () => ({
  createBooking: jest.fn(),
  createBookingItem: jest.fn(),
}));

jest.mock("../utils/sendEmail", () => jest.fn());

jest.mock("../database/db", () => ({
  query: jest.fn(),
}));

const request = require("supertest");
const app = require("../server");

const { createBooking, createBookingItem } = require("../model/bookingModel");

const sendBookingEmail = require("../utils/sendEmail");
const pool = require("../database/db");

describe("POST /api/booking/create", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create booking successfully", async () => {
    createBooking.mockResolvedValue({
      id: 1,
    });

    createBookingItem.mockResolvedValue({});

    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            standard_price: 100,
            express_price: 150,
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            name: "John",
            email: "john@gmail.com",
          },
        ],
      })
      .mockResolvedValueOnce({});

    sendBookingEmail.mockResolvedValue();

    const res = await request(app)
      .post("/api/booking/create")
      .send({
        user_id: 1,
        date: "2026-07-20",
        time: "10:00 AM",
        mode: "regular",
        basket: [
          {
            service_id: 1,
            name: "Wash",
            qty: 2,
            option: "Normal",
            mode: "regular",
          },
        ],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Booking created successfully");
  });

  test("should return 400 if booking information is missing", async () => {
    const res = await request(app).post("/api/booking/create").send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Missing booking information");
  });

  test("should call createBooking", async () => {
    createBooking.mockResolvedValue({
      id: 1,
    });

    createBookingItem.mockResolvedValue({});

    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            standard_price: 100,
            express_price: 150,
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            name: "John",
            email: "john@gmail.com",
          },
        ],
      })
      .mockResolvedValueOnce({});

    sendBookingEmail.mockResolvedValue();

    await request(app)
      .post("/api/booking/create")
      .send({
        user_id: 1,
        date: "2026-07-20",
        time: "10:00 AM",
        mode: "regular",
        basket: [
          {
            service_id: 1,
            name: "Wash",
            qty: 2,
            option: "Normal",
            mode: "regular",
          },
        ],
      });

    expect(createBooking).toHaveBeenCalled();
  });

  test("should call createBookingItem", async () => {
    createBooking.mockResolvedValue({
      id: 1,
    });

    createBookingItem.mockResolvedValue({});

    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            standard_price: 100,
            express_price: 150,
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            name: "John",
            email: "john@gmail.com",
          },
        ],
      })
      .mockResolvedValueOnce({});

    sendBookingEmail.mockResolvedValue();

    await request(app)
      .post("/api/booking/create")
      .send({
        user_id: 1,
        date: "2026-07-20",
        time: "10:00 AM",
        mode: "regular",
        basket: [
          {
            service_id: 1,
            name: "Wash",
            qty: 2,
            option: "Normal",
            mode: "regular",
          },
        ],
      });

    expect(createBookingItem).toHaveBeenCalled();
  });

  test("should send booking confirmation email", async () => {
    createBooking.mockResolvedValue({
      id: 1,
    });

    createBookingItem.mockResolvedValue({});

    pool.query
      .mockResolvedValueOnce({
        rows: [
          {
            standard_price: 100,
            express_price: 150,
          },
        ],
      })
      .mockResolvedValueOnce({
        rows: [
          {
            name: "John",
            email: "john@gmail.com",
          },
        ],
      })
      .mockResolvedValueOnce({});

    sendBookingEmail.mockResolvedValue();

    await request(app)
      .post("/api/booking/create")
      .send({
        user_id: 1,
        date: "2026-07-20",
        time: "10:00 AM",
        mode: "regular",
        basket: [
          {
            service_id: 1,
            name: "Wash",
            qty: 2,
            option: "Normal",
            mode: "regular",
          },
        ],
      });

    expect(sendBookingEmail).toHaveBeenCalled();
  });

  test("should return 500 if server error occurs", async () => {
    createBooking.mockRejectedValue(new Error("Database error"));

    const res = await request(app)
      .post("/api/booking/create")
      .send({
        user_id: 1,
        date: "2026-07-20",
        time: "10:00 AM",
        mode: "regular",
        basket: [
          {
            service_id: 1,
            name: "Wash",
            qty: 2,
            option: "Normal",
            mode: "regular",
          },
        ],
      });

    expect(res.statusCode).toBe(500);
  });
});
