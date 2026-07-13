const { createBooking, createBookingItem } = require("../model/bookingModel");
const sendBookingEmail = require("../utils/sendEmail");
const pool = require("../database/db");

const addBooking = async (req, res) => {
  try {
    const { user_id, basket, date, time, mode } = req.body;

    if (!user_id || !basket || basket.length === 0 || !date || !time) {
      return res.status(400).json({
        message: "Missing booking information",
      });
    }

    // Create booking
    const booking = await createBooking(user_id, date, time, mode, 0);

    let total = 0;

    // Save every basket item
    for (const item of basket) {
      // Save booking item
      await createBookingItem(
        booking.id,
        item.service_id,
        item.option,
        item.qty,
      );

      console.log("Basket item:", item);
      // Get price from services table
      const result = await pool.query(
        `
                SELECT standard_price, express_price
                FROM services
                WHERE id = $1
                `,
        [item.service_id],
      );
      console.log("Query result:", result.rows);
      if (result.rows.length > 0) {
        const service = result.rows[0];

        const price =
          item === "express" ? service.express_price : service.standard_price;

        total += price * item.qty;
      }
    }
    // Get user's name and email
    const userResult = await pool.query(
      `
      SELECT name, email
      FROM users
      WHERE id = $1
      `,
      [user_id],
    );

    const user = userResult.rows[0];
    // Update total price
    await pool.query(
      `
      UPDATE bookings
      SET total_price=$1
      WHERE id=$2
      `,
      [total, booking.id],
    );

    // Send confirmation email
    try {
      await sendBookingEmail({
        to: user.email,
        name: user.name,
        bookingId: booking.id,
        date,
        time,
        total,
      });

      console.log("Booking confirmation email sent.");
    } catch (err) {
      console.log("Failed to send email:", err.message);
    }
    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const result = await pool.query(`
                SELECT
                b.id,
                u.name,
                u.email,
                u.contact,
                b.booking_date,
                b.booking_time,
                b.service_mode,
                b.status,
                b.total_price,
                STRING_AGG(
                    s.service_name || ' (' ||
                    bi.service_option || ') x' ||
                    bi.quantity,
                    ', '
                ) AS items
            FROM bookings b
            JOIN users u
                ON b.user_id = u.id
            LEFT JOIN booking_items bi
                ON b.id = bi.booking_id
            LEFT JOIN services s
                ON bi.service_id = s.id
            GROUP BY
                b.id,
                u.name,
                u.email,
                u.contact,
                b.booking_date,
                b.booking_time,
                b.service_mode,
                b.status,
                b.total_price
            ORDER BY b.id DESC 
        `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    // Update booking status
    const result = await pool.query(
      `UPDATE bookings
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id],
    );

    const booking = result.rows[0];

    // Get user email
    const userResult = await pool.query(
      `
      SELECT name, email
      FROM users
      WHERE id = $1
      `,
      [booking.user_id],
    );

    const user = userResult.rows[0];

    // Send status email
    await sendBookingEmail({
      to: user.email,
      name: user.name,
      bookingId: booking.id,
      status: status,
      date: booking.booking_date,
      time: booking.booking_time,
      total: booking.total_price,
    });

    res.json({
      message: "Booking Updated",
      booking,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        u.id,
        u.name,
        u.email,
        u.contact,
        COALESCE(SUM(b.total_price), 0) AS total_spent
      FROM users u

      LEFT JOIN bookings b
      ON u.id = b.user_id
      AND b.status <> 'Cancelled'

      WHERE u.role = 'user'

      GROUP BY
        u.id,
        u.name,
        u.email,
        u.contact

      ORDER BY u.id DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getServices = async (req, res) => {
  try {
    const result = await pool.query(`
            SELECT *
            FROM services
            ORDER BY category, service_name
        `);

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getMyBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
            SELECT
                b.id,
                b.booking_date,
                b.booking_time,
                b.service_mode,
                b.status,
                b.total_price,

                 STRING_AGG(
                    s.service_name || ' (' ||
                    bi.service_option || ') x' ||
                    bi.quantity,
                    ', '
                ) AS items


            FROM bookings b

            LEFT JOIN booking_items bi
            ON b.id = bi.booking_id

            LEFT JOIN services s
            ON bi.service_id = s.id

        

            WHERE b.user_id = $1

            GROUP BY
                b.id,
                b.booking_date,
                b.booking_time,
                b.service_mode,
                b.status,
                b.total_price

            ORDER BY b.id DESC
        `,
      [userId],
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      UPDATE bookings
      SET status='Cancelled'
      WHERE id=$1
      AND status='Pending'
      RETURNING *
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(400).json({
        message: "Only pending bookings can be cancelled",
      });
    }

    res.json({
      message: "Booking cancelled",
      booking: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  addBooking,
  getBookings,
  updateBooking,
  getCustomers,
  getServices,
  getMyBookings,
  cancelBooking,
};
