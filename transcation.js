const mongoose = require("mongoose");
const connect = require("./connection");
const User = require("./model");
// for currency calculation handling

// connect the DB and get the User Model
const amount = 30;

connect.then(async (db) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // always pass session to find queries when the data is needed for the transaction session
    const sender = await User.findOne({ accountId: "ACC001" }).session(session);

    // calculate the updated sender balance
    sender.balance = sender.balance - amount;

    // if funds are insufficient, the transfer cannot be processed
    if (sender.balance < 0) {
      throw new Error(`User - ${sender.name} has insufficient funds`);
    }

    // save the sender updated balance
    // do not pass the session here
    // mongoose uses the associated session here from the find query return
    // more about the associated session ($session) later on
    await sender.save();

    const receiver = await User.findOne({ accountId: "ACC002" }).session(
      session
    );

    receiver.balance = receiver.balance + amount;

    await receiver.save();

    // commit the changes if everything was successful
    await session.commitTransaction();
  } catch (error) {
    // if anything fails above just rollback the changes here

    // this will rollback any changes made in the database
    await session.abortTransaction();

    // logging the error
    console.error(error);

    // rethrow the error
    throw error;
  } finally {
    // ending the session
    session.endSession();
  }
});
