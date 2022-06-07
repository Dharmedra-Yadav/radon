const express = require('express');
const router = express.Router();
// const { route } = require('express/lib/application');

// const bookModel= require("../models/bookModel")
// const BookController= require("../controllers/userController")
const BookController=require("../controllers/bookController1")

/*-----------------------Create API---------------------------------*/
router.post("/createBook",BookController.createBook)  
router.get("/bookList", BookController.booksList)
router.post("/getBooksInYear",BookController.getBooksInYear)
router.post("/getParticularBooks",BookController.getParticularBooks)
router.get("/getXINRBooks",BookController.getXINRBooks)
router.get("/getRandomBooks",BookController.getRandomBooks)

module.exports = router;    