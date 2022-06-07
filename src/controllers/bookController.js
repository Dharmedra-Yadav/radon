const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const BookModel= require("../models/bookModel")
const mongoose = require('mongoose');


/*-----------------------Include All Methods------------------------*/
const createAuthor= async function (req, res) {
    let data= req.body
    let savedData= await authorModel.create(data)
    res.send({msg: savedData})
}

const createBook= async function (req, res) {
    let data=req.body
    let savedData=await bookModel.create(data)
    res.send({msg:savedData})
}
const getBooksByChetanBhagat=async (req,res)=>{
    let data=await authorModel.find({author_name:"Chetan Bhagat"}).select("author_id")
    let bookData=await authorModel.find({author_id:data[0].author_id})
    res.send({msg:bookData})
}
const authorOfBook=async function(req,res){
    let data=await BookModel.findOneAndUpdate({name:"Two states"},{$set:{price:100}},{new:true})
    let authorData=await authorModel.find({author_id:data.author_id}).select("author_name")
    let price=data.price
    res.send({msg:authorData,price})
}

/*----------------------This is the Public Side Code-----------------------*/  
module.exports.createAuthor=createAuthor
module.exports.createBook= createBook
module.exports.getBooksByChetanBhagat=getBooksByChetanBhagat
module.exports.authorOfBook=authorOfBook