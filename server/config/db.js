const mongoose = require("mongoose");
require("dotenv").config();

// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifedTopology: true,
// });

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "connection error"));
// db.once("open", () => {
//   console.log(" Connected to Mongo db");
// });

const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connect to MongoDB');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDb;
