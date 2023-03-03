var express = require("express");
const bodyParser = require("body-parser");
const accountController = require("../controllers/accountController");
const accountRouter = express.Router();
accountRouter.use(bodyParser.json());

accountRouter.route("/").get(accountController.index);
accountRouter
  .route("/")
  .get(accountController.index)
  .post(accountController.create);

module.exports = accountRouter;
