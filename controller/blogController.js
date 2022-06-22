const blogModels = require("../models/blogModels");
const mongoose = require('mongoose')
const authorModel = require('../models/authorModels')



const creatBlog = async function (req, res) {
  try {
    let data = req.body;

    // if (!isValidBody(data)) {
    //     return res
    //       .status(400)
    //       .send({
    //         status: false,
    //         msg: "Invalid Request Parameter, Please Provide Another Details",
    //       });
    //   }
    //   let {title,authorId,body,category,subcategory}=data;

    //   if(!isValid(title)){
    //     return res.status(400).send({status:false,msg:"Title is Required"})
    // }
    // if(!isValidTitle(title)){
    //     return res.status(400).send({status:false,msg:"Title is Required"})
    // }
    // const authorId2=await authorModel.findOne({_id:authorId})
    // console.log(authorId2)      

    // if(tags){
    //     if(Array.isArray(tags)){
    //         newblogsData[`tags`]=[...tags]
    //     }

    // }
    if (data.isPublished === false) {
      let blogData = await blogModels.create(data);
      blogData.publishedAt = null;
      res.status(201).send({ status: true, msg: blogData });
    }

    if (data.isPublished === true) {
      let blogData = await blogModels.create(data);
      blogData.publishedAt = new Date();
      res.status(201).send({ status: true, msg: blogData });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

const updateBlogs = async function (req, res) {

  try {
    let blogId = req.params.blogId
    let body = req.body;

    let updatedBlogData = await blogModels.findByIdAndUpdate(blogId, body, { new: true });

    if (!updatedBlogData) {
      return res.status(404).send({ status: false, msg: "Data not found" })
    } else if (updatedBlogData.isPublished == true) {

      updatedBlogData.publishedAt = new Date();
      res.status(200).send({ status: true, data: updatedBlogData })
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
}

const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId
    let updatedBlog = await blogModels.findOneAndUpdate({ _id: blogId }, { $set: { isDeleted: true } }, { new: true })

    if (!updatedBlog) {
      return res.status(404).send({ status: false, msg: "Blog is not available" })
    } else if (updatedBlog.isDeleted == true) {
      updatedBlog.deletedAt = new Date();
      res.status(200).send({ status: true, data:" "})
    }

    res.status(200).send({ data: updatedBlog })
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
}


module.exports.creatBlog = creatBlog;
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlog = deleteBlog
