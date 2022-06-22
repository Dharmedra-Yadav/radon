const express=require('express')
const router=express.Router()
const authorController=require('../controller/authorController')
const blogController=require('../controller/blogController')

/***********************POST API*******************************/
router.post("/authors",authorController.creatAuthor)
router.post("/blogs",blogController.creatBlog)

module.exports=router
