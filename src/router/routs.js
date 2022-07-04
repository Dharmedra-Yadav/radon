const express = require("express");
const router = express.Router();
const collegeController = require("../controller/collegeController");
const internController = require("../controller/internController");

/***************************************[Project API's]***************************************/
router.post("/functionup/colleges", collegeController.createCollege);
router.post("/functionup/interns", internController.createIntern);
router.get("/functionup/collegeDetails", internController.getCollegeDetails);

/*********************************[Publically-Router]*****************************************/
module.exports = router;
