/***************************** */
const express = require("express");
const router = require("./router/route");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://Dharmendra:dkyadav123@cluster0.kq9bu.mongodb.net/Sk-Project-1",

    { useNewurlParser: true }
  )
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", router);

app.listen(process.env.PORT || 5501, function () {
  console.log("Example app listening on port:-" + (process.env.PORT || 5501));
});
