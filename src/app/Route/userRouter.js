const express = require("express");
const { registerController, loginController, getUserInfo } = require("../controller/authController");
const { protect } = require("../middleware/middleware");
const userRouter = express.Router();

userRouter.post("/register" , registerController);
userRouter.post("/login" , loginController);
userRouter.get("/userinfo" , protect , getUserInfo)

module.exports = userRouter;