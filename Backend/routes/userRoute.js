const {
  addUser,
  login,
  getAllUserFromTheDB,
  getUserByIDDB,
  deleteUserByIDDB,
  updateUserIDBD,
  getUsers,
} = require("../controller/userController");

const express = require("express"); // we can reques
const router = express.Router();
const upload = require("../middleware/uploads");
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/authMiddleware");

router.post("/create", upload.single("image"), addUser); // single means only one file is upload
router.post("/login", login); // NOT TO wrong
router.get("/getAll", verifyToken, isAdmin, getAllUserFromTheDB);
router.get("/getById/:id", getUserByIDDB);
// router.get("/getAll", verifyToken, isAdmin, getUsers);
router.get("/deleteUserById/:id", deleteUserByIDDB);
router.put("/updateUser/:id", upload.single("image"), updateUserIDBD);

module.exports = router;
