const mongoose = require("mongoose");

// a simple mongoose model
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    accountId: String,
    name: String,
    balance: Number,
  })
);

module.exports = User;