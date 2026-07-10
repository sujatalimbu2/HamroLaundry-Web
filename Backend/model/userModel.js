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

const updateUser = async (
  id,
  name,
  email,
  password,
  address,
  contact,
  image,
) => {
  const result = await pool.query(
    "Update users SET name = $1, email = $2, address = $3, contact = $4, image= $5 WHERE id = $6 RETURNING *",
    [name, email, address, contact, image, id],
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
}; // for exports to run any file
