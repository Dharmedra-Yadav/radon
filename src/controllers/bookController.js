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
const getBooksByAuthorId=async function(req,res){
    let authorId=req.parms.requstID
    let authorName=await bookModel.find({author_id}).select({novelName:1,_id:0})
    console.log(authorName)
    if(authorName.length===0){
        res.send({msg:"No Books by this  Author Id"})
    }else{
        res.send({msg:authorName})
    }
}
const getAuthorByAge=async function(req,res){
    let novel=await bookModel.find({rating:{$gt:4}}).select({author_id:1,_id:0})
    console.log(novel)
    let authorInfo
    for(let index=0;index<bookModel.length;index++){
        authorInfo=await authorModel.find({$and:[{age:{$gt:50}},novel[index]]}
            ).select({authorName:1,age:1,_id:0})}
        res.send({msg:authorInfo})

    }

/*----------------------This is the Public Side Code-----------------------*/  
module.exports.createAuthor=createAuthor
module.exports.createBook= createBook
module.exports.getBooksByChetanBhagat=getBooksByChetanBhagat
module.exports.authorOfBook=authorOfBook
module.exports.getBooksByAuthorId=getBooksByAuthorId
module.exports.getAuthorByAge=getAuthorByAge