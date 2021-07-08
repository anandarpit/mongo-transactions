const mongoose = require("mongoose");

const dbUri = "mongodb://localhost:2717,localhost:2718,localhost:2719/arpit";

const Connect = mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true,
    replicaSet: "orvide",
  })
  .then(() => {
    console.log("mongodb connected.");
  })
  .catch((err) => console.log(err));

module.exports = Connect;
