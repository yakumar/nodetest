const express = require("express");
const helmet = require("helmet");
const path = require("path");
const multer = require("multer");

const cors = require("cors");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = express();

///

var ig = require("instagram-scraping");

app.use(helmet());

app.use(function (req, res, next) {
  res.header("Access-control-Allow-Origin", "*"),
    res.header(
      "Access-Control-Allow-Methods",
      "HEAD",
      "OPTIONS",
      "DELETE, PUT, GET, POST"
    );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set("view engine", "ejs");

app.get("/", (req, res) => {
  ig.scrapeTag("samantha").then((result) => {
    console.dir(result);
    res.json({ data: `${result}` });
  });
});

//*********
app.use(cors());

app.listen(process.env.PORT || 8080, () => {
  console.log("server Setup Completed");
});
