const UserModel= require("../models/userModel")
const bookModel=require("../models/bookModel")
// const bookController=require("../bookControllers")

/*--------------------LOGIC CREATING------------------------------------*/
const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const booksList= async function(req, res) {
    let list= await bookModel.find().select({bookName:1, authorName: 1, _id: 0})
    res.send({msg: list})
}
const getBooksInYear=async function(req,res){
    let yearList=await bookModel.find({ year: req.body.year}).select({bookName:1,_id:0})
    res.send({mag:yearList})
}
const getParticularBooks=async function(req,res){
    let specificBook=await bookModel.find(req.body)
        res.send({mag:specificBook})
}
const getXINRBooks=async function(req,res){
   let list = await bookModel.find({"prices.indianPrice": {$in: ["100INR", "200INR","500 INR"]}} ).select({bookName:1,_id:0})
   res.send({msg:list})
}
const getRandomBooks=async function(req,res){
    let allBooks = await bookModel.find({$or:[ {stockAvailable: true},{ totalPages: {$gt: 500}}]})
    res.send({msg: allBooks})

}

/*----------------This is All Method in Public Code----------------------*/
module.exports.createBook=createBook
module.exports.booksList=booksList
module.exports.getBooksInYear=getBooksInYear
module.exports.getParticularBooks=getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks=getRandomBooks