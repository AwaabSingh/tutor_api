const mongoose = require("mongoose");
// const config = require("config");
// const db = config.get("mongoURL")

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/Tutor_hub", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("Mongodb Connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
   }
};

module.exports = connectDB;
