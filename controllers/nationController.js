const Nations = require("../models/nations");

class nationController {
  index(req, res, next) {
    Nations.find({})
      .then((nations) => {
        res.render("nation", {
          title: "The list of Nations",
          nations: nations,       
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const nation = new Nations(req.body);
    nation
      .save()
      .then(() => res.redirect("/nation"))
      .catch((error) => {
        error;
      });
  }
  formEdit(req, res, next) {
    const nationId = req.params.nationId;
    let viewsData = {};
    Nations.findById(nationId)
      .then((nation) => {
        res.render("editNation", {
          title: "The detail of Nation",
          nation: nation,
        });
      })
      .catch(next);
  }
  edit(req, res, next) {
    Nations.updateOne({ _id: req.params.nationId }, req.body)
      .then(() => {
        res.redirect("/nation");
      })
      .catch(next);
  }

  delete(req, res, next) {
    Nations.findByIdAndDelete({ _id: req.params.nationId })
      .then(() => res.redirect("/nation"))
      .catch(next);
  }
}
module.exports = new nationController ();
