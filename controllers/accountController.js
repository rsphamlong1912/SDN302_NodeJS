const Accounts = require("../models/accounts");

class accountController {
  index(req, res, next) {
    res.render("register");
  }
  create(req, res, next) {
    Accounts.findOne({
      username: req.body.username,
    }).then((data) => {
      if (data) {
        res.render("register", { error: "Username already exists" });
      } else {
        const account = new Accounts(req.body);
        account
          .save()
          .then(() => {
            res.redirect("/login"); // chuyển hướng đến trang đăng nhập
          })
          .catch((error) => {
            res.render("register", { error: "Error creating account" });
          });
      }
    });
  }
  formEdit(req, res, next) {}
  edit(req, res, next) {}

  delete(req, res, next) {}
}
module.exports = new accountController();
