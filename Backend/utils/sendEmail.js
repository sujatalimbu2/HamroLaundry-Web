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
  date,
  time,
  total,
}) => {
  await transporter.sendMail({
    from: `"Hamro Laundry" <${process.env.EMAIL}>`,
    to,
    subject: "Hamro Laundry - Booking Confirmation",
    html: `
      <h2>Booking Confirmed ✅</h2>

      <p>Hello <b>${name}</b>,</p>

      <p>Your laundry booking has been confirmed.</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <tr>
          <td><b>Booking ID</b></td>
          <td>${bookingId}</td>
        </tr>
        <tr>
          <td><b>Date</b></td>
          <td>${date}</td>
        </tr>
        <tr>
          <td><b>Time</b></td>
          <td>${time}</td>
        </tr>
        <tr>
          <td><b>Total</b></td>
          <td>NPR ${total}</td>
        </tr>
      </table>

      <br>

      <p>Thank you for choosing <b>Hamro Laundry</b>.</p>
    `,
  });
};

module.exports = sendBookingEmail;