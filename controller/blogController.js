const blogModels = require("../models/blogModels");
const mongoose=require('mongoose')
const authorModel=require('../models/authorModels')

const isValid = function (x) {
    if (typeof x === "undefined" || x === null) return false;
    if (typeof x === "string" && x.trim().length === 0) return false;
    return true;
  };

  const isValidBody = function (x) {
    return Object.keys(x).length > 0;
  };

  const isValidObjectId=function(x){
     return mongoose.Types.ObjectId.isValid(x)
  }

const creatBlog = async function (req, res) {
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
      let {title,authorId,body,category,subcategory}=data;

      if(!isValid(title)){
        return res.status(400).send({status:false,msg:"Title is Required"})
    }
    if(!isValidTitle(title)){
        return res.status(400).send({status:false,msg:"Title is Required"})
    }
    const authorId2=await authorModel.findOne({_id:authorId})
    console.log(authorId2)      
      
    if(tags){
        if(Array.isArray(tags)){
            newblogsData[`tags`]=[...tags]
        }

    }
    let blogData = await blogModels.create(data);
    res.status(201).send({ status: true, msg: blogData });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};
module.exports.creatBlog = creatBlog;
