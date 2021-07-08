const mongoose = require("mongoose");
const connect = require("./connection");
const User = require("./model");

connect.then(async (db) => {
  await User.create([
    { accountId: "ACC001", name: "John", balance: 50.0 },
    { accountId: "ACC002", name: "Jane", balance: 50.0 },
  ]);
})

