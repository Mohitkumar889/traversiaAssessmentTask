require("dotenv").config();
const mongoose = require("mongoose");
const mongoDbUrl = process.env.mongoDBUrl;

mongoose.connect(mongoDbUrl, {});

const con = mongoose.connection;

mongoose.set("debug", true);

con.on("open", () => {
  console.log("connected to database");
});

con.on("error", (err) => {
  console.error("Error connecting to the database", err);
});

module.exports = con;
