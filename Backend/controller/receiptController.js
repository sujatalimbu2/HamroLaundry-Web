const PDFDocument = require("pdfkit");
const pool = require("../database/db");

const downloadReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    // Get booking + user
    const bookingResult = await pool.query(
      `
      SELECT
        b.id,
        b.booking_date,
        b.booking_time,
        b.status,
        b.total_price,
        u.name,
        u.email
      FROM bookings b
      JOIN users u
      ON b.user_id = u.id
      WHERE b.id = $1
      `,
      [id],
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const booking = bookingResult.rows[0];

    // Get booked services
    const itemsResult = await pool.query(
      `
      SELECT
        s.service_name,
        bi.service_option,
        bi.quantity
      FROM booking_items bi
      JOIN services s
      ON bi.service_id = s.id
      WHERE bi.booking_id = $1
      `,
      [id],
    );

    // Create PDF
    const doc = new PDFDocument({
      margin: 50,
    });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Receipt-${booking.id}.pdf`,
    );

    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    // Title
    doc
      .fontSize(22)
      .text("HAMRO LAUNDRY", {
        align: "center",
      });

    doc
      .fontSize(16)
      .text("Booking Receipt", {
        align: "center",
      });

    doc.moveDown();

    doc.text("--------------------------------------------");

    doc.text(`Booking ID : ${booking.id}`);
    doc.text(`Customer   : ${booking.name}`);
    doc.text(`Email      : ${booking.email}`);
    doc.text(`Date       : ${booking.booking_date}`);
    doc.text(`Time       : ${booking.booking_time}`);
    doc.text(`Status     : ${booking.status}`);

    doc.moveDown();

    doc.text("Services");
    doc.text("--------------------------------------------");

    itemsResult.rows.forEach((item) => {
      doc.text(
        `${item.service_name} (${item.service_option})  x${item.quantity}`,
      );
    });

    doc.moveDown();

    doc.text("--------------------------------------------");

    doc.fontSize(16).text(`Total: Rs. ${booking.total_price}`);

    doc.moveDown(2);

    doc
      .fontSize(12)
      .text("Thank you for choosing Hamro Laundry.", {
        align: "center",
      });

    doc.end();
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  downloadReceipt,
};