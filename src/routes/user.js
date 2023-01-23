const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const {
  getMe,
  updateUser,
  deleteUser,
  getAllUsers,
  getSingleUser,
  uploadAvatar,
} = require("../controllers/user.js");
const { FileStorage } = require("../helper/file_storage");
const fileStorage = new FileStorage(
  ["image/jpeg", "image/jpg", "image/png"],
  "avatar"
);

//@route    GET /me
//@desc     Get me
//@access   PRIVATE
router.get("/me", auth, getMe.controller);

//@route    GET /users
//@desc     Get all users
//@access   PRIVATE
router.get("/users", auth, getAllUsers.controller);

//@route    GET /users/id
//@desc     Get singl user
//@access   PRIVATE
router.get("/users/:id", auth, getSingleUser.controller);

//@route    PUT /users/:id
//@desc     Update user
//@access   PRIVATE
router.put("/users/:id", auth, updateUser.controller);

//@route    PUT /users/:id/avatar
//@desc     Upload profile photo
//@access   PRIVATE
router.put(
  "/users/:id/avatar",
  auth,
  fileStorage.upload.single("avatar"),
  uploadAvatar.controller
);

//@route    PUT /users/:id
//@desc     Delete user
//@access   PRIVATE
router.delete("/users/:id", auth, deleteUser.controller);

module.exports = router;
