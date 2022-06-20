const express = require("express");
const router = express.Router();
const CowinController = require("../controllers/cowinController");
const weatherControoler = require("../controllers/weatherController");
const seeMainController = require("../controllers/meanController");

router.get("/test-me", function (req, res) {
  res.send("My first ever api!");
});

/*****************************Vaccination Related API************************************/
router.get("/cowin/states", CowinController.getStates);
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts);
router.get("/cowin/getByPin", CowinController.getByPin);
router.post("/cowin/getOtp", CowinController.getOtp);

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date
router.get("/cowin/findByDistrict", CowinController.getVacDist);

/******************************Calculate Wheather API***********************************/
router.get("/getWheather", weatherControoler.getSortCities);

/*******************************Cacluate Menas URL API**********************************/
router.post("seeMean", seeMainController.seeMean);

module.exports = router;
