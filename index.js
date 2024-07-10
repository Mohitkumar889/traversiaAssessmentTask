require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

const PORT = process.env.port;

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "hello from root!",
  });
});

app.use("/api", require("./src/routes"));

app.listen(PORT, () => {
  console.log("server listening on port " + PORT);
});
