const bcrypt = require("bcrypt");
const User = require("../models/users");
class userController {
  index(req, res, next) {
    res.render("register");
  }
  regist(req, res, next) {
    const { username, password } = req.body;
    let errors = [];
    if (!username || !password) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (password.length < 6) {
      errors.push({ msg: "Password must be at least 6 characters" });
    }
    if (errors.length > 0) {
      res.render("register", {
        errors,
        username,
        password,
      });
    } else {
      User.findOne({ username: username }).then((user) => {
        if (user) {
          errors.push({ msg: "Username already exists" });
          res.render("register", {
            errors,
            username,
            password,
          });
        } else {
          const newUser = new User({
            username,
            password,
            name: "",
            yob: "",
          });
          //Hash password
          bcrypt.hash(newUser.password, 10, function (err, hash) {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.redirect("/user/login");
              })
              .catch(next);
          });
        }
      });
    }
  }

  login(req, res, next) {
    res.render("login");
  }
  submitLogin(req, res, next) {
    const { username, password } = req.body;
    let errors = [];
    if (!username || !password) {
      errors.push({ msg: "Please enter all fields" });
    }
    if (errors.length > 0) {
      res.render("login", {
        errors,
        username,
        password,
      });
    } else {
      User.findOne({ username: username }).then((user) => {
        if (!user) {
          errors.push({ msg: "Username or Password is incorrect" });
          res.render("login", {
            errors,
            username,
            password,
          });
        } else {
          //Match user password
          bcrypt.compare(password, user.password, function (err, result) {
            if (err) throw err;
            if (result) {
              req.session.user = user; //Save user session
              res.redirect("/player"); //Redirect to dashboard page
            } else {
              errors.push({ msg: "Username or Password is incorrect" });
              res.render("login", {
                errors,
                username,
                password,
              });
            }
          });
        }
      });
    }
  }

  formEdit(req, res, next) {
    res.render("editUser");

    // const nationId = req.params.nationId;
    // let viewsData = {};
    // Nations.findById(nationId)
    //   .then((nation) => {
    //     res.render("editNation", {
    //       title: "The detail of Nation",
    //       nation: nation,
    //     });
    //   })
    //   .catch(next);
  }

  updateUser(req, res, next) {
    const { name, yob } = req.body;
    const userId = req.session.user._id;

    User.findOneAndUpdate(
      { _id: userId },
      { $set: { name: name, yob: yob } },
      { new: true }
    )
      .then((user) => {
        req.session.user = user; // cập nhật lại thông tin user trong session
        res.redirect("/user/");
      })
      .catch(next);
  }

  logout(req, res, next) {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/user/login");
    });
  }
}

module.exports = new userController();
