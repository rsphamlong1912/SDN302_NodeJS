const Players = require("../models/players");

let clubData = [
  { id: "1", name: "Arsenal" },
  { id: "2", name: "Manchester United" },
  { id: "3", name: "Chelsea" },
  { id: "4", name: "Manchester City" },
  { id: "5", name: "PSG" },
  { id: "6", name: "Inter Milan" },
  { id: "7", name: "Real Madrid" },
  { id: "8", name: "Barcelona" },
];

let positionData = [
  { id: "1", name: "Thủ môn" },
  { id: "2", name: "Hậu vệ" },
  { id: "3", name: "Tiền vệ" },
  { id: "4", name: "Tiền đạo" },
];

class playerController {
  index(req, res, next) {
    Players.find({})
      .then((players) => {
        res.render("player", {
          title: "The list of Players",
          players: players,
          clubList: clubData,
          positionList: positionData,
        });
      })
      .catch(next);
  }
  create(req, res, next) {
    const player = new Players(req.body);
    player
      .save()
      .then(() => res.redirect("/player"))
      .catch((error) => {
        error;
      });
  }
  formEdit(req, res, next) {
    const playerId = req.params.playerId;
    let viewsData = {};
    Players.findById(playerId)
      .then((player) => {
        res.render("editPlayer", {
          title: "The detail of Player",
          player: player,
          clubList: clubData,
          positionList:positionData,
        });
      })
      .catch(next);
  }
  edit(req, res, next) {
    Players.updateOne({ _id: req.params.playerId }, req.body)
      .then(() => {
        res.redirect("/player");
      })
      .catch(next);
  }

  delete(req, res, next) {
    Players.findByIdAndDelete({ _id: req.params.playerId })
      .then(() => res.redirect("/player"))
      .catch(next);
  }
}
module.exports = new playerController();
