const express=require('express')
const router=express.Router()
const authorController=require('../controller/authorController')
const blogController=require('../controller/blogController')


router.post("/authors",authorController.creatAuthor)

router.post("/blogs",blogController.creatBlog)

router.put("/blogs/:blogId", blogController.updateBlogs)

router.delete("/blogs/:blogId", blogController.deleteBlog)

module.exports=router
