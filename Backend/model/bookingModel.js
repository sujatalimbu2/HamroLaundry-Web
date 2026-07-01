const pool = require("../database/db");

// Create Booking
const createBooking = async (
    user_id,
    booking_date,
    booking_time,
    service_mode
) => {

    const result = await pool.query(
        `INSERT INTO bookings
        (user_id, booking_date, booking_time, service_mode)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [user_id, booking_date, booking_time, service_mode]
    );

    return result.rows[0];
};

// Save Booking Items
const createBookingItem = async (
    booking_id,
    service_name,
    service_option,
    quantity
) => {

    const result = await pool.query(
        `INSERT INTO booking_items
        (booking_id, service_name, service_option, quantity)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [booking_id, service_name, service_option, quantity]
    );

    return result.rows[0];
};

module.exports = {
    createBooking,
    createBookingItem,
};