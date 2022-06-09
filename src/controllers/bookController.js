const { get } = require("express/lib/response")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
// const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publishedModel")

const createBook= async function (req, res) {
    let book = req.body
    let authorId=book.author_id
    if(!authorId) return res.send({msg:"Author Id is required"})

    let publisherId=book.publisher_id
    if(!publisherId) return res.send({msg:"PublisherId is required"})

    let saveAuthorData= await authorModel.findById(authorId)
    if(!saveAuthorData) return res.send({msg:"Invalid Author Id"})

    let publisherData= await publisherModel.findById(publisherId)
    if(!publisherData) return res.send({msg:"Invalid Publisher Id"})

    let getAllBook = await bookModel.create(book)
    res.send({data: getAllBook})
}
const getBooksData=async function(req,res){
    let getAllBook=await bookModel.find().populate('author_id','publisher_id')
    res.send({msg:getAllBook})
}
module.exports.createBook= createBook
module.exports.getBooksData=getBooksData

