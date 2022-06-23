const blogModels = require("../models/blogModels");
// const mongoose = require("mongoose");
// const authorModel = require("../models/authorModels");
const jwt=require("jsonwebtoken")


/***************************************Create-Blogs******************************************/
const creatBlog = async function (req, res) {
  try {
    let data = req.body;
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

/**************************************Update-Blogs*******************************************/
const updateBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let body = req.body;
    let updatedBlogData = await blogModels.findByIdAndUpdate(blogId, body, {new: true,});

    if (!updatedBlogData) {
      return res.status(404).send({ status: false, msg: "Data not found" });
    } else if (updatedBlogData.isPublished == true) {
      updatedBlogData.publishedAt = new Date();
      res.status(200).send({ status: true, data: updatedBlogData });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
};

/****************************************Delete-Blog******************************************/
const deleteBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId;
    let updatedBlog = await blogModels.findOneAndUpdate(
      { _id: blogId },
      { $set: { isDeleted: true } },
      { new: true }
    );

    // if (!updatedBlog) {
    //   return res.status(404).send({ status: false, msg: "Blog is not available" });
    // } else if (updatedBlog.isDeleted == true) {
    //   updatedBlog.deletedAt = new Date();
    //   res.status(200).send({ status: true, data: " " });
    // }

    res.status(200).send({ data: updatedBlog });
  } catch (error) {
    res.status(500).send({ status: false, msg: "Server error" });
  }
};

/*********************************************Get-Query***************************************/
const getBlogs = async (req, res) => {
  try {
    const getBlog = await blogModels.find({isDeleted: false,isPublished: true});

    res.status(200).send({
      status: true,
      msg: "sucessfully get data on datadase",
      data: getBlog,
    });

    if (!getBlog) {
      res.status(404).send({ status: false, msg: "blog not found" });
    }

    let authorId = req.query.authorId;
    let category = req.query.category;
    let tags = req.query.tags;

    let subcategory = req.query.subcategory;
    console.log(subcategory);
  } catch (err) {
    res.status(500).send({ msg: err });
  }
};

/**************************************DELETE-QUERY*******************************************/
const deleteQuery = async (req, res) => {
  try {
    const authorId = req.query.authorId;

    let category = req.query.category;

    let tags = req.query.tags;

    let subcategory = req.query.subcategory;

    let isPublished = req.body.isPublished;

    const getBlog = await blogModels
      .find({
        $or: [
          { authorId: authorId },
          { category: category },
          { tags: tags },
          { subcategory: subcategory },
          { isPublished: isPublished },
        ],
      })
      .updateMany(
        { isDeleted: false },
        { $set: { isDeleted: true } },
        { new: true }
      );

    if (!getBlog) {
      res.status(404).send({ status: false, msg: "Data not found" });
    } else {
      res.send({ data: getBlog });
    }
  } catch (err) {
    res.status(500).send({ msg: "invalid" });
  }
};



/***************************************PUBLIC************************************************/
module.exports.creatBlog = creatBlog;
module.exports.updateBlogs = updateBlogs;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteQuery = deleteQuery;
module.exports.getBlogs = getBlogs;
