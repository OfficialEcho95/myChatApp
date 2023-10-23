const express = require("express");
const {
  createuser,
  loginUser,
  getAllUsers,
  logoutUser,
} = require("../controllers/userController");
const { authMiddleware } = require("../middlewares/middlewares");

const userRouter = express.Router();

userRouter.get("/dashboard", authMiddleware, (req, res) => {
  res.status(200).json({
    status: "Success",
    data: req.user,
  });
});

userRouter.post("/register", createuser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", logoutUser);

userRouter.get("/", getAllUsers);

module.exports = userRouter;
