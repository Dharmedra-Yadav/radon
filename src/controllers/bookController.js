const { get } = require("express/lib/response")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel=require("../models/publishedModel")

/*********************Create Book Logic Bulid****************************/
const createBook= async function (req, res) {
    let book = req.body

/**********************Condition-1***********************************/
    let authorId=book.author_id
    if(!authorId) return res.send({msg:"Author Id is required"})

/**********************Condition-2***********************************/
    let publisherId=book.publisher_id
    if(!publisherId) return res.send({msg:"Publisher Id is required"})

/***********************Condition-3**********************************/
    let saveAuthorData= await authorModel.findById(authorId)
    if(!saveAuthorData) return res.send({msg:"Invalid Author Id"})

/***********************Condition-4***********************************/
    let publisherData= await publisherModel.findById(publisherId)
    if(!publisherData) return res.send({msg:"Invalid Publisher Id"})

/************************Condition-5**********************************/
    let getAllBook = await bookModel.create(book)
    res.send({data: getAllBook})
}
/***************************Find Author ID & Publisher ID*****************************/
const getBooksData=async function(req,res){
    let getAllBook=await bookModel.find().populate('author_id','publisher_id')
    res.send({msg:getAllBook})
}

/******************************Public Declaration This line*****************************/
module.exports.createBook= createBook
module.exports.getBooksData=getBooksData


