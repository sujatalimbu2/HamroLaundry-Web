const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendBookingEmail = async ({
  to,
  name,
  bookingId,
  status,
  date,
  time,
  total,
}) => {
  await transporter.sendMail({
    from: `"Hamro Laundry" <${process.env.EMAIL}>`,
    to,
    subject: "Hamro Laundry - Booking Confirmation",
    html: `
        <h2>Hamro Laundry Update</h2>

        <p>Hello ${name},</p>

        <p>Your booking status has been updated.</p>

        <p>
        <b>Booking ID:</b> ${bookingId}<br>
        <b>Status:</b> ${status}<br>
        <b>Date:</b> ${date}<br>
        <b>Time:</b> ${time}<br>
        <b>Total:</b> Rs. ${total}
        </p>

        <p>Thank you for choosing Hamro Laundry.</p>
    `,
  });
};

module.exports = sendBookingEmail;
