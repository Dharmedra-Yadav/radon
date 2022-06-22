const authorModel = require("../model/authorModel")
const jwt = require('jsonwebtoken')

const isValid = function (value) {
if (typeof value === "undefined" || value === null) return false;
if (typeof value === "string" && value.trim().length === 0) return false;
return true;
};

/===========================================1-CreateAuthorApi=================================/

const createAuthor = async function (req, res) {

try {

        let data = req.body

        if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Provides the Author Details" })

        if (!isValid(data.fname)) return res.status(400).send({ status: false, msg: "FirstName is Required" })

        if (!isValid(data.lname)) return res.status(400).send({ status: false, msg: "LastName is Required" })

        if (!data.fname.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "Invalid firstName" })

        if (!data.lname.match(/^[a-zA-Z]+$/)) return res.status(400).send({ status: false, msg: "Invalid lastName" })

        if (!isValid(data.title)) return res.status(400).send({ status: false, msg: "Title is Required" })

        if (["Mr", "Mrs", "Miss"].indexOf(data.title) == -1) return res.status(400).send({status: false,data: "Enter a valid title Mr or Mrs or Miss ",});

        if (!isValid(data.email)) return res.status(400).send({ status: false, msg: "EmailId is Required" })

        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email)) return res.status(400).send({ status: false, msg: "Email-Id is invalid" })

        if (!isValid(data.password)) return res.status(400).send({ status: false, msg: "password is Required" })

        let emailCheck = await authorModel.findOne({ email: data.email })

        if (emailCheck) return res.status(400).send({ status: false, msg: "Email-Id already Registerd" })

        let saveData = await authorModel.create(data)

        res.status(201).send({ status: true, msg:"Author Created Sucessfully",data:saveData })

    }
    catch (err) {

        res.status(500).send({ error: err.message })

    }

}

//===============================2-Login and Token Generation Api==========================//

const login = async function (req, res) {

    try{

    let data = req.body

    if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Provide the Correct Login Details" })

    if (!isValid(data.email)) return res.status(401).send({ status: false, msg: "EmailId is required" })

    if (!isValid(data.password)) return res.status(401).send({ status: false, msg: "Password is required" })

    if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(data.email)) return res.status(400).send({ status: false, msg: "email Id is invalid" })

    let user = await authorModel.findOne({ email: data.email, password: data.password })

    if (!user) return res.status(401).send({ status: false, msg: "EmailId or Password incorrect" })

    let token = await jwt.sign({
                          userId: user._id.toString(),
                        iat:Math.floor(Date.now()/100),
                        exp:Math.floor(Date.now()/100)+24*60*60
                    },"IUBGIU22NKJWWEW89NO2ODWOIDH2")

    res.setHeader("x-api-key", token)

    res.status(201).send({ status: true, msg: "Author login successful!!", token })

}

catch (err) {

    res.status(500).send({ status: false, msg: err.message });

}
}

module.exports ={createAuthor,login}

 
/*****************************controller/blogController.js**************************/

const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

const isValid1 = function (value) {
if (typeof value === "undefined" || value === null) return false;
if (typeof value === "string" && value.trim().length === 0) return false;
return true;
};

const isValidString = function (value) {
if (typeof value === "string" && value.trim().length === 0) return false;
return true;
};

//3============================ CreateBlog Api========================================//

const createBlog = async function (req, res) {

try {

    let data = req.body //data come from body

    if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "Please Provide Valid Blog Details" })

    if (!isValid(data.title)) return res.status(400).send({ status: false, msg: "Title is Required"  })

    if (!isValid(data.body)) return res.status(400).send({ status: false, msg: "Body is Required"  })

    if (!isValid(data.authorId)) return res.status(400).send({ status: false, msg: "AuthorId is Required" })

    if (!mongoose.isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Enter a Valid AuthorId"})

    let AuthorData = await authorModel.findById(data.authorId)

    if (!AuthorData) return res.status(404).send({ status: false, msg: "No such authorId found" })

    if (!isValid(data.category)) return res.status(400).send({ status: false, msg: "Category is Required" })

    let category=data.category.split(",").map((x)=>(x.trim()))
    data.category=category

    if (!isValidString(data.subcategory)) return res.status(400).send({ status: false, msg: "SubCategory is Required" })
    if(data.subcategory){
      let subcategory=data.subcategory.split(",").map((x)=>(x.trim()))
    data.subcategory=subcategory
    }

    if (!isValidString(data.tags)) return res.status(400).send({ status: false, msg: "tags is Required" })
    if(data.tags){
      let tags=data.tags.split(",").map((x)=>(x.trim()))
    data.tags=tags
    }

    let checkBlog=await blogModel.findOne(data)

    if(checkBlog) return res.status(400).send({ status: false, msg: "Blog already exists" })

    if(data.isPublished) data.publishedAt=new Date()

    let blogCreate = await blogModel.create(data)

    res.status(201).send({ status: true, msg:"Blog Created Sucessfully" ,data:blogCreate })

}

catch (err) {

    res.status(500).send({ status:false,error: err.message })

}
}

//3 ========================================GET BLOG DATA====================================//

const getSpecificAllBlogs = async function (req, res) {

try {

    let data = req.query

    if (!isValidString(data.authorId)) return res.status(400).send({ status: false, msg: "AuthorId is Required" })
    if(data.authorId){

    if (!mongoose.isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Enter a Valid AuthorId"})

    let AuthorData = await authorModel.findById(data.authorId)

    if (!AuthorData) return res.status(404).send({ status: false, msg: "No such authorId found" })
    }

    if (!isValidString(data.category)) return res.status(400).send({ status: false, msg: "category is Required" })
    if(data.category){
      let category=data.category.split(",").map((x)=>(x.trim()))
      data.category=category
    }

    if (!isValidString(data.subcategory)) return res.status(400).send({ status: false, msg: "subcategory is Required" })
    if(data.subcategory){
      let subcategory=data.subcategory.split(",").map((x)=>(x.trim()))
      data.subcategory=subcategory
    }

    if (!isValidString(data.tags)) return res.status(400).send({ status: false, msg: "tags is Required" })
    if(data.tags){
      let tags=data.tags.split(",").map((x)=>(x.trim()))
      data.tags=tags
    }

    let blogData = await blogModel.find({ $and: [data, { isDeleted: false }, { isPublished: true }] }).populate("authorId")

    if (!blogData.length) return res.status(400).send({ status: false, msg: "No such blog exists" })

    res.status(200).send({ status: true, data: blogData })

} catch (err) {

    res.status(500).send({ status: false, msg: err.message });

}
};

//4 ==================================update Blog==========================================//

const updateBlog = async function (req, res) {

try {

    let data = req.body
    let blog_Id = req.params.blogId

    if (!Object.keys(data).length) return res.status(400).send({ status: false, msg: "input can't be empty" })

    if (!isValidString(data.title)) return res.status(400).send({ status: false, msg: "tags is Required" })

    if (!isValidString(data.body)) return res.status(400).send({ status: false, msg: "body is Required" })

    if (!isValidString(data.subcategory)) return res.status(400).send({ status: false, msg: "SubCategory is Required" })
    if(data.subcategory){
      let subcategory=data.subcategory.split(",").map((x)=>(x.trim()))
    data.subcategory=subcategory
    }

    if (!isValidString(data.tags)) return res.status(400).send({ status: false, msg: "tags is Required" })
    if(data.tags){
      let tags=data.tags.split(",").map((x)=>(x.trim()))
    data.tags=tags
    }

    let checkBlog = await blogModel.findById(blog_Id)

    if(!checkBlog)return res.status(404).send({ status: false, msg: "Blog Not Found" })

    if (checkBlog.isDeleted == true) return res.status(400).send({ status: false, msg: "This blog is already Deleted" })


    let update = await blogModel.findByIdAndUpdate(blog_Id,

      { $push:{tags:data.tags,subcategory:data.subcategory},title:data.title,body:data.body,isPublished: true, publishedAt: new Date()  },

      { new: true })

    res.status(200).send({ status: true, data: update })

}

catch (err) {

    res.status(500).send({ error: err.message })

}
}

//5=====================================DeletedBlog By Path Param Id=======================//

const deleteBlog = async function (req, res) {

try {

    let blog_Id = req.params.blogId;

    let checkBlog = await blogModel.findById(blog_Id)

    if(!checkBlog)return res.status(404).send({ status: false, msg: "Blog Not Found" })

    if (checkBlog.isDeleted == true) return res.status(400).send({ status: false, msg: "this blog is already deleted" })

    let deletedBlog = await blogModel.findOneAndUpdate(

      { _id: blog_Id },

      { $set: { isDeleted: true ,DeletedAt:Date.now()} },

      { new: true });

      if (deletedBlog.modifiedCount==0) return res.status(400).send({ status: false, msg: "No Blog Document Exists" })

      res.status(200).send({ status: true, data: deletedBlog });

}

catch (err) {

    res.status(500).send({ msg: "error", error: err.message })

}
}

//6=================================DeleteBlog By query params===============================//

const deleteparams = async function (req, res) {

try {

    let data = req.query;

      const deleteByQuery = await blogModel.updateMany(

      { $and: [data, { isDeleted: false }] },

      { $set: { isDeleted: true ,DeletedAt:new Date()} },

      { new: true })

      if (deleteByQuery.modifiedCount==0) return res.status(400).send({ status: false, msg: "The Blog is already Deleted" })

      res.status(200).send({ status: true, msg: deleteByQuery })

}

catch (err) {

    res.status(500).send({ error: err.message })

}
}

module.exports={createBlog,getSpecificAllBlogs,updateBlog,deleteBlog,deleteparams}

/**************************************src/index.js**********************************/
const express=require('express');
const router = require('./routes/route');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const app=express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded(({ extended: true })))

mongoose.connect("mongodb+srv://amarjeet:pNEQmxssu7hxVRvs@cluster0.qq47f.mongodb.net/project1" ,
{ useNewurlParser:true
})
.then (() => console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',router)

app.listen(process.env.PORT||3000,function(){
console.log("port is running at:"+(process.env.PORT||3000))
});
 
/**************************middleware/check.js***************************************/
const jwt = require("jsonwebtoken")
const blogModel = require('../model/blogModel')
const mongoose=require('mongoose')

//=====================================authentication============================//

const authentication = function (req, res, next) {

    try {

        let token = req.headers["x-api-key"]

        if (!token)return res.status(400).send({ status: false, msg: "token not found" })

        let decodedToken = jwt.verify(token, "IUBGIU22NKJWWEW89NO2ODWOIDH2")//verify token

        if (!decodedToken) return res.status(401).send({ status: false, msg: "invalid token" })

        next()
    }

    catch (err) {

        res.status(500).send({ status: false, msg: err.message });
    }

}

//==========================authorization====================//

const authorization = async function (req, res, next) {

    try {

        let token = req.headers["x-api-key"]

        if (!token)return res.status(400).send({ status: false, msg: "token not found" })

        let decodedToken = jwt.verify(token, "IUBGIU22NKJWWEW89NO2ODWOIDH2")

        if (!decodedToken) return res.status(401).send({ status: false, msg: "invalid token" })

        let blog_Id = req.params.blogId
        let userId = decodedToken.userId
        let data = req.query;

        if(blog_Id){
        if (!mongoose.isValidObjectId(blog_Id)) return res.status(400).send({ status: false, msg: "Enter a Valid BlogId"})
        let authorData=await blogModel.findOne({_id:blog_Id,authorId:userId})
        if (!authorData)return res.send({ status: false, msg:"you are not authorized" })
        }



        if(data.authorId){
            if (!mongoose.isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Enter a Valid authorId"})
            if(data.authorId!=userId)return res.send({ status: false, msg:"you are not authorized" })
        }


        if(data.category){
            let authorData=await blogModel.find({category:data.category,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })
        }

        if(data.subcategory){
            let authorData=await blogModel.find({subcategory:data.subcategory,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })
        }

        if(data.tags){
            let authorData=await blogModel.find({tags:data.tags,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })
        }

        if(data.isPublished){
            let authorData=await blogModel.find({isPublished:data.isPublished,authorId:userId})
            if (!authorData.length)return res.send({ status: false, msg:"you are not authorized" })
        }

        next()

}

    catch (error) {

        res.status(500).send(error.message)

    }

}

module.exports={authentication,authorization}

/************************************model/authorModel.js************************/
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({

    fname: {
        type: String,
        required:'firstName is Required',
        trim:true
    },

    lname: {
         type: String,
         required: 'lastName is Required',
         trim:true
        },

    title: {
        type: String,
        required:'Title is Required',
        enum: ["Mr", "Mrs", "Miss"] },

    email: {
        type: String,
        required: 'EmailId is FRequired',
        lowercase:true,
        trim:true,
        unique: true,
    },

    password: {
         type: String,
         trim:true,
         required: 'Password is Required' }

}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema)
 
/*******************************model/blogModel.js************************************/

const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const blogSchema = new mongoose.Schema(
{

        title:
        {
            type: String,
            required: 'Blog title is Required',
            trim:true
        },
        body:
        {
            type: String,
            required: 'Blog Body is Required',
            trim:true
        },
        authorId: {
            type: ObjectId,
            trim:true,
            required: 'AuthorId is Required',
            ref: 'Author'
        },
        tags: {
            type:[String],
            trim:true
        },

        category: {
            type: [String],
            required:'Blog category is Required',
            trim:true
        },

        subcategory: {
            type: [String],
            trim:true
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },

        publishedAt: Date,
        DeletedAt:Date,

        isPublished: {
            type: Boolean,
            default: false
        }

    }, { timestamps: true });

module.exports = mongoose.model('blogModel', blogSchema)
 
/********************************routes/route.js****************************/
const express=require('express')
const router = express.Router()
const authorController=require('../controller/authorController')
const blogController=require('../controller/blogController')
const middleWare=require('../middleware/check')

//-------------------------unprotected apis----------------------//

router.post('/authors',authorController.createAuthor);
router.post('/login',authorController.login);

//------------------------protected apis-----------------------//

router.post('/blogs',middleWare.authentication,blogController.createBlog);
router.get('/blogs',middleWare.authentication,blogController.getSpecificAllBlogs);
router.put('/blogs/:blogId',middleWare.authorization,blogController.updateBlog)
router.delete('/blogs/:blogId',middleWare.authorization,blogController.deleteBlog)
router.delete('/blogs',middleWare.authorization,blogController.deleteparams)

module.exports=router
