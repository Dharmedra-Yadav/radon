const express = require("express");
const bodyParser = require("body-parser");
const route = require("./router/routs");
const { default: mongoose } = require("mongoose");
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*************************************[MongoDB Connection]************************************/
mongoose
  .connect(
    "mongodb+srv://Dharmendra:dkyadav123@cluster0.kq9bu.mongodb.net/Open-to-intern-Project",
  )
  .then(() => console.log("HELLO Mr:-Dkyadav , MongoDb is connected"))
  .catch((err) => console.log(err));

/*************************************[Global-API's]******************************************/
app.use("/", route);

app.use((req, res, next) => {
  res.status(404).send({
    status: 404,
    error: `Not found ${req.url}`,
  });
  next();
});

/***********************************[port-Creation]*******************************************/
app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
