const internModel = require("../models/collegeModels");
const collegeModel = require("../models/internModels");

/*********************************[VALIDATION-For-Body]***************************************/
const isValidReqBody = function (reqBody) {
  return Object.keys(reqBody).length > 0;
};

/*********************************[VALIDATION-For-Valid]**************************************/
const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

/********************************[VALIDATION-For-Email]***************************************/
const isValidEmail = function (value) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(value)) {
    // Please Enter a Valid Email Address
    return false;
    //res.status(400).send({status: false, msg:"Invalid Email!"})
  }
  return true;
};

/*********************************[VALIDATION-For-Number]*************************************/
const isValidNumber = function (value) {
  if (/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
    return true;
  } else return false;
};

/***********************************************[CREATE INTERN]****************************************************/
const createIntern = async function (req, res) {
  try {
    const { name, collegeName, mobile, email, isDeleted } = req.body; // Destructing Key and Values.

    if (!isValidReqBody(req.body))
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter Intern Details" });

    /*************************************[Required-Name]*****************************************/
    if (!isValid(name))
      return res
        .status(400)
        .send({ status: false, msg: "Intern name is required" });

    if (typeof name != "string")
      return res
        .status(400)
        .send({ status: false, msg: "Characters are allowed only" });

    /***********************************[Check-Provide-Email]*************************************/
    if (!isValid(email))
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Intern Email Address" });

    /*********************************[Check-Valid-Email]*****************************************/
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Valid Email Address" });

    /*********************************[Require-Mobile-Number]*************************************/
    if (!req.body.mobile)
      return res
        .status(400)
        .send({ status: false, message: "mobile is required" });

    /*******************************[Check-Valid-mobile-Number]***********************************/
    if (!isValidNumber(mobile))
      return res
        .status(400)
        .send({ msg: `this mobile is not valid ::${mobile}` });

    /*******************************[Check-mobile-Number]*****************************************/
    let checknumber = await internModel.findOne({
      mobile: req.body.mobile,
    }); /*Check Mobile From DB*/
    if (checknumber) {
      return res
        .status(400)
        .send({ status: false, msg: "Mobile Number Already Used" });
    }

    /**********************************[Provide-College-Name]*************************************/
    if (!isValid(req.body.collegeName)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please Provide Intern College Name" });
    }

    let collegeData = await collegeModel.findOne({
      name: req.body.collegeName.toLowerCase(),
      isDeleted: false,
    });

    if (!collegeData) {
      return res
        .status(400)
        .send({ status: false, message: "This College Name Does Not Exists" });
    }
    let collegeId = collegeData._id;

    let data = { name, email, mobile, collegeId, isDeleted }; //Destructing

    /***********************[Before All Cases Passing Now Will Create Intern]*********************/
    const internData = await internModel.create(data);
    const finalinternData = await internModel
      .findOne({ _id: internData._id })
      .select({
        isDeleted: 1,
        name: 1,
        email: 1,
        mobile: 1,
        collegeId: 1,
        _id: 0,
      });
    res.status(201).send({
      status: true,
      message: "Intern Created Successfully",
      data: finalinternData,
    });

    /*************************************[Catch-Block]*******************************************/
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

/*********************************************[GET COLLEGE DETAILS]****************************************************************/
const getCollegeDetails = async function (req, res) {
  try {
    let filter = req.query;
    if (!filter)
      return res.status(404).send({ status: false, Error: "Please set query" });
    let checkCollegeName = await collegeModel.findOne({
      name: filter.name,
      isDeleted: false,
    }); //check college name from DB

    if (!checkCollegeName)
      return res
        .status(404)
        .send({ status: false, msg: "No such college Name found" });

    let collegeId = checkCollegeName._id; //get collgeId from checkCollegeName
    let getAllInternData = await internModel
      .find({ collegeId: collegeId, isDeleted: false })
      .select({ name: 1, email: 1, mobile: 1 });

    if (!getAllInternData.length)
      return res
        .status(404)
        .send({ status: false, msg: "No intern Apply for this College" });

    let name = checkCollegeName.name; // assign value
    let fullname = checkCollegeName.fullname;
    let logoLink = checkCollegeName.logoLink;

    let collegeData = {
      //call value
      name: name,
      fullname: fullname,
      logoLink: logoLink,
      interns: getAllInternData,
    };

    res
      .status(200)
      .send({ status: true, msg: "got intern Sucessfully", data: collegeData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

/**********************************[Publicaaly-Method's]**************************************/
module.exports.getCollegeDetails = getCollegeDetails;
module.exports.createIntern = createIntern;
