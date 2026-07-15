const {
  createUser,
  existingUser,
  getAllUser,
  getUserById,
  deleteById,
  updateUser,
  updatePassword,
  searchUser,
  saveResetToken,
  findUserByResetToken,
  clearResetToken,
} = require("../model/userModel");

const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const addUser = async (req, res) => {
  try {
    console.log(req.body); // debugging
    const { name, email, address, contact } = req.body;
    const image = req.file ? req.file.filename : null; //
    if (!name || !email || !address || !contact) {
      return res.status(400).json({
        // return to exit loop
        message: "Field empty",
      });
    }

    // Check if email already exists
    const userExists = await existingUser(email);

    if (userExists) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await createUser(
      name,
      email,
      hashpassword,
      address,
      contact,
      image,
    );

    if (user) {
      res.status(201).json({
        message: "Created successful",
        user: user,
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Registration Unsccessful",
      e: e.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let user;
    if (search) {
      user = await searchUser(search);
    } else {
      user = await getAllUser();
    }
    res.json({
      message: "successful",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "unsuccessfull fetch",
      e: e.message,
    });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password: inputPassword } = req.body;
    if (!email || !inputPassword) {
      return res.status(400).json({
        message: "Field empty",
      });
    }
    const user = await existingUser(email);
    if (!user) {
      return res.status(400).json({
        message: "email is not register",
      });
    }

    const isMatched = await bcrypt.compare(inputPassword, user.password);
    if (!isMatched) {
      return res.json({
        message: "password doesnt matched",
      });
    }

    const token = JWT.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        contact: user.contact,
        image: user.image,
      },
    });
    // conform token
  } catch (e) {
    res.status(500).json({
      message: "not succesful",
      e: e.message,
    });
  }
};
const getAllUserFromTheDB = async (req, res) => {
  try {
    const user = await getAllUser();
    if (!user || user.length == 0) {
      return res.status(400).json({
        message: "user is not present",
      });
    }
    res.status(200).json({
      message: "successful",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "unsuccessful",
      e: e.message,
    });
  }
};

// function getuserbyid
const getUserByIDDB = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({
        message: "not found",
      });
    }
    res.status(200).json({
      message: "successfully fetched",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "unsuccessful",
      e: e.message,
    });
  }
};

const deleteUserByIDDB = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteById(id);
    if (!user) {
      return res.status(404).json({
        message: "user not found",
      });
    }
    res.json({
      message: "user deleted successfully",
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      message: "server error",
      e: e.message,
    });
  }
};

const updateUserIDBD = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const id = req.params.id;
    const { name, email, address, contact } = req.body;
    const image = req.file ? req.file.filename : null;

    const user = await updateUser(id, name, email, address, contact, image);
    console.log("Updated user:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const updatePasswordDB = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(id, hashedPassword);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await existingUser(email);

    if (!user) {
      return res.status(404).json({
        message: "Email not registered",
      });
    }

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires in 30 minutes
    const expiry = new Date(Date.now() + 30 * 60 * 1000);

    // Save token into database
    await saveResetToken(user.id, token, expiry);

    // Reset link
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Hamro Laundry Password Reset",
      html: `
        <h2>Reset Password</h2>

        <p>You requested a password reset.</p>

        <a href="${resetLink}">
            Click here to reset your password
        </a>

        <p>This link expires in 30 minutes.</p>
      `,
    });

    res.json({
      message: "Password reset email sent",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    // Find user by token
    const user = await findUserByResetToken(token);

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    await updatePassword(user.id, hashedPassword);

    // Remove token
    await clearResetToken(user.id);

    res.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addUser,
  login,
  getAllUserFromTheDB,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
  updatePasswordDB,
  forgotPassword,
  resetPassword,
  getUsers,
};
