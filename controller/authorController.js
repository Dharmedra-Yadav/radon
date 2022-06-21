const authorModel = require("../models/authorModels");

const isValid = function (x) {
  if (typeof x === "undefined" || x === null) return false;
  if (typeof x === "string" && x.trim().length === 0) return false;
  return true;
};
const isValidTitle = function (x) {
  return ["Mr", "Mrs", "Miss"].indexOf(x) !== -1;
};
const isValidBody = function (x) {
  return Object.keys(x).length > 0;
};

const creatAuthor = async function (req, res) {
  try {
    let data = req.body;
    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Invalid Request Parameter, Please Provide Another Details",
        });
    }
    let {title,fName,lName,email,password}=data;

    if(!isValid(title)){
        return res.status(400).send({status:false,msg:"Title is Required"})
    }
    if(!isValidTitle(title)){
        return res.status(400).send({status:false,msg:"Title is Required"})
    }
    if(!isValid(fName)){
        return res.status(400).send({status:false,msg:"First Name is Required"})
    }
    if(!isValid(lName)){
        return res.status(400).send({status:false,msg:"Last Name is Required"})
    }
    if(!isValid(email)){
        return res.status(400).send({status:false,msg:"Email is Required"})

    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        return res.status(400).send({status:false,msg:"Email Should Be Valid Email Address"})
    }

    if(!isValid(password)){
        return res.status(400).send({status:false,msg:"Password is Required"})
    }
    const isEmailIdUnique=await authorModel.findOne({email})
    if(isEmailIdUnique){
        return res.status(400).send({status:false,msg:`${email} Email is Already Present`})
    }
    const newAuthorData={fName,lName,title,email,password}
    
    let authorData = await authorModel.create(newAuthorData);
    res.status(201).send({ status: true,msg:"Author Created Succefully", data: authorData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.creatAuthor = creatAuthor;
