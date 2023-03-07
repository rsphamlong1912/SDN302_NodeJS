var express = require("express");
const bodyParser = require("body-parser");
const userController = require("../controllers/userController");
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route("/").get(userController.index).post(userController.regist);
userRouter
  .route("/login")
  .get(userController.login)
  .post(userController.submitLogin);

userRouter
  .route("/edit")
  .get(userController.formEdit)
  .post(userController.updateUser);

userRouter.route("/logout").get(userController.logout);

module.exports = userRouter;
