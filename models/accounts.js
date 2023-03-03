const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    username: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

var Accounts = mongoose.model("accounts", accountSchema);

module.exports = Accounts;
