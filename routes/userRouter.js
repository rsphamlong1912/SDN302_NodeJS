var express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route("/").get(userController.index).post(userController.regist);
userRouter.route("/login").get(userController.login);

module.exports = userRouter;
