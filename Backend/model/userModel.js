const pool = require("../database/db");

const createUser = async (name, email, password, address, contact, image) => {
  const result = await pool.query(
    "insert into users(name, email, password, address, contact, image) values ($1,$2,$3,$4,$5,$6) returning *",
    [name, email, password, address, contact, image],
  );

  return result.rows[0];
};
const existingUser = async (email) => {
  const result = await pool.query("Select * from users where email = $1", [
    email,
  ]);
  return result.rows[0];
};

const getAllUser = async () => {
  const result = await pool.query("Select * from users");
  return result.rows;
};

const searchUser = async (keyword) => {
  const result = await pool.query(
    "select * from users where name ILike $1 or email like $1",
    [`%${keyword}%`],
  );
  return result.rows;
};

const getUserById = async (id) => {
  const result = await pool.query("Select * from users where id = $1", [id]);
  return result.rows[0];
};

const deleteById = async (id) => {
  const result = await pool.query("Delete from users where id = $1", [id]);
  return result.rows;
};

const updateUser = async (id, name, email, address, contact, image) => {
  let result;

  if (image) {
    result = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        address = $3,
        contact = $4,
        image = $5
      WHERE id = $6
      RETURNING *
      `,
      [name, email, address, contact, image, id],
    );
  } else {
    result = await pool.query(
      `
      UPDATE users
      SET
        name = $1,
        email = $2,
        address = $3,
        contact = $4
      WHERE id = $5
      RETURNING *
      `,
      [name, email, address, contact, id],
    );
  }

  return result.rows[0];
};

const updatePassword = async (id, password) => {
  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE id = $2 RETURNING *",
    [password, id],
  );

  return result.rows[0];
};

const saveResetToken = async (id, token, expiry) => {
  const result = await pool.query(
    `UPDATE users
     SET reset_token = $1,
         reset_token_expiry = $2
     WHERE id = $3
     RETURNING *`,
    [token, expiry, id],
  );

  return result.rows[0];
};

const findUserByResetToken = async (token) => {
  const result = await pool.query(
    `SELECT *
     FROM users
     WHERE reset_token = $1
     AND reset_token_expiry > NOW()`,
    [token],
  );

  return result.rows[0];
};

const clearResetToken = async (id) => {
  const result = await pool.query(
    `UPDATE users
     SET reset_token = NULL,
         reset_token_expiry = NULL
     WHERE id = $1
     RETURNING *`,
    [id],
  );

  return result.rows[0];
};

module.exports = {
  createUser,
  existingUser,
  getAllUser,
  getUserById,
  deleteById,
  updateUser,
  searchUser,
  updatePassword,
  saveResetToken,
  findUserByResetToken,
  clearResetToken,
}; // for exports to run any file
