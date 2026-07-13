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
  status = "Pending",
  date,
  time,
  total,
  serviceList,
}) => {
  await transporter.sendMail({
    from: `"Hamro Laundry" <${process.env.EMAIL}>`,
    to,
    subject: `Hamro Laundry - Booking ${status}`,
    html: `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;overflow:hidden;">

      <div style="background:#111;color:white;padding:20px;text-align:center;">
        <h2 style="margin:0;">Hamro Laundry</h2>
        <p style="margin:6px 0 0;">Booking Confirmation</p>
      </div>

      <div style="padding:25px;">

        <p>Hello <b>${name}</b>,</p>
        ${
          serviceList
            ? `
              <h3>Booked Services</h3>

              <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
                <tr style="background:#f5f5f5;">
                  <th style="padding:10px;border:1px solid #ddd;">Service</th>
                  <th style="padding:10px;border:1px solid #ddd;">Mode</th>
                  <th style="padding:10px;border:1px solid #ddd;">Qty</th>
                </tr>

                ${serviceList}
              </table>
              `
            : ""
        }

        <p>
          ${
            status === "Pending"
              ? "Your booking has been successfully received and is awaiting confirmation."
              : status === "Confirmed"
                ? "Your booking has been confirmed. We look forward to serving you."
                : status === "Ready"
                  ? "Great news! Your laundry is ready for pickup or delivery."
                  : status === "Completed"
                    ? "Your laundry service has been completed. Thank you for choosing Hamro Laundry."
                    : status === "Cancelled"
                      ? "Your booking has been been cancelled. If this was unexpected, please contact us."
                      : "Thank you for choosing Hamro Laundry."
          }
        </p>
        <table
          style="width:100%;border-collapse:collapse;margin:20px 0;"
        >

          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><b>Booking ID</b></td>
            <td style="padding:10px;border:1px solid #ddd;">#${bookingId}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><b>Status</b></td>
            <td style="padding:10px;border:1px solid #ddd;">${status}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><b>Date</b></td>
            <td style="padding:10px;border:1px solid #ddd;">${date}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><b>Time</b></td>
            <td style="padding:10px;border:1px solid #ddd;">${time}</td>
          </tr>

          <tr>
            <td style="padding:10px;border:1px solid #ddd;"><b>Total Amount</b></td>
            <td style="padding:10px;border:1px solid #ddd;"><b>Rs. ${Number(total).toLocaleString()}</b></td>
          </tr>

        </table>

        </table>

        <p style="margin-top:20px;">
          We appreciate your trust in <b>Hamro Laundry</b>.
          Our team is committed to providing clean, fresh, and timely laundry services.
        </p>

        <p>
          If you have any questions, simply reply to this email.
        </p>

        <br>

       <p>
          Regards,<br>
          <b>Hamro Laundry Team</b><br><br>

          📧 laundryhamro@gmail.com<br>
          📞 +977-98XXXXXXXX<br>
          📍 Kathmandu, Nepal
        </p>
        <hr style="border:none;border-top:1px solid #eee;margin:25px 0;">

        <p style="font-size:12px;color:#777;text-align:center;">
          © ${new Date().getFullYear()} Hamro Laundry. All rights reserved.
        </p>

      </div>

    </div>
    `,
  });
};

module.exports = sendBookingEmail;
