const {
    createBooking,
    createBookingItem,
} = require("../model/bookingModel");

const addBooking = async (req, res) => {

    try {

        const {
            user_id,
            basket,
            date,
            time,
            mode,
        } = req.body;

        if (
            !user_id ||
            !basket ||
            basket.length === 0 ||
            !date ||
            !time
        ) {
            return res.status(400).json({
                message: "Missing booking information"
            });
        }

        // Create booking
        const booking = await createBooking(
            user_id,
            date,
            time,
            mode
        );

        // Save every basket item
        for (const item of basket) {

            await createBookingItem(
                booking.id,
                item.name,
                item.option,
                item.qty
            );

        }

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const pool = require("../database/db");

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

    STRING_AGG(
        bi.service_name || ' (' ||
        bi.service_option || ') x' ||
        bi.quantity,
        ', '
    ) AS items

        FROM bookings b

        JOIN users u
        ON b.user_id = u.id

        LEFT JOIN booking_items bi
        ON b.id = bi.booking_id

        GROUP BY
            b.id,
            u.name,
            u.email,
            u.contact,
            b.booking_date,
            b.booking_time,
            b.service_mode,
            b.status

        ORDER BY b.id DESC

           
        `);

        res.json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {

        const result = await pool.query(
            `UPDATE bookings
             SET status = $1
             WHERE id = $2
             RETURNING *`,
            [status, id]
        );

        res.json({
            message: "Booking Updated",
            booking: result.rows[0]
        });

    } catch (err) {
        console.log(err);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

const getCustomers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        email,
        contact
      FROM users
      WHERE role = 'user'
      ORDER BY id DESC
    `);

    res.json(result.rows);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
    addBooking,
     getBookings,
    updateBooking,
     getCustomers
};
