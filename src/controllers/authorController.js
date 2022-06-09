const AuthorModel= require("../models/authorModel")

/******************************Create Author************************************/
const createAuthor= async function (req, res) {
    let author = req.body
    let authorCreated = await AuthorModel.create(author)
    res.send({data: authorCreated})
}
/******************************Find Author**************************************/
const getAuthorsData= async function (req, res) {
    let authors = await AuthorModel.find()
    res.send({data: authors})
}
/******************************Find Publisher************************************/
const publisherData=async function(req, res){
    let publisher=await AuthorModel.find()
    res.send({data:publisherData})
}
/***************************Public Declaration This lines*************************/
module.exports.createAuthor= createAuthor
module.exports.getAuthorsData= getAuthorsData
module.exports.publisherData=publisherData