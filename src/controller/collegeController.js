const collegeModel = require("../models/collegeModels");
const validUrl = require("valid-url");

/**************************************[Validation-For-Body]**********************************/
const isValidReqBody = function (reqBody) {
  return Object.keys(reqBody).length > 0;
};

/*************************************[Validation-For-Valid]**********************************/
const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

/**************************************[CREATE-COLLEGE]***************************************/
const createCollege = async function (req, res) {
  try {
    if (!isValidReqBody(req.body))
      return res.status(400).send({
        status: false,
        msg: "Invalid parameters.Please provide college details",
      });
    const nameRegex = /^[a-zA-Z ]{2,10}$/;
    const data2 = req.body;
    let { name, fullname, logoLink } = data2; //Destructing

    req.body.fullname = fullname
      .split(" ")
      .filter((word) => word)
      .join(" "); //remove space

    /*******************************[Check-Required-College-Name]*********************************/
    if (!isValid(name))
      return res
        .status(400)
        .send({ status: false, msg: "college name is required" });

    /********************************[Check-Required-Name]****************************************/
    if (!nameRegex.test(name))
      return res.status(400).send({ status: false, msg: " name is required " });

    /*********************************[Check-Full-Name-Require]***********************************/
    if (!isValid(fullname))
      return res
        .status(400)
        .send({ status: false, msg: " fullname is required" });

    /*******************************[Check-Required-Logo-link]************************************/
    if (!isValid(logoLink))
      return res
        .status(400)
        .send({ status: false, msg: "logoLink is required" });

    /********************************[Check-Valid-Logo-Link]**************************************/
    if (!validUrl.isWebUri(logoLink))
      return res
        .status(400)
        .send({ status: false, msg: "logoLink url is invalid" });

    /***********************************[Find-College-Name]***************************************/
    let findCollege = await collegeModel.findOne({ name });
    if (findCollege)
      return res
        .status(400)
        .send({ status: false, msg: "college name is already exist" });
    let data = await collegeModel.create(req.body);
    res
      .status(201)
      .send({ status: true, msg: "college created successfull", data: data });

    /*************************************[Catch-Block]*******************************************/
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

/*********************************[Publically-Method's]***************************************/
module.exports.createCollege = createCollege;
