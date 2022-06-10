const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")

/*-----------------------Create API------------------------------*/
router.post("/createAuthor", BookController.createAuthor)
router.get("/createBook", BookController.createBook)
router.post("/getBooksByChetanBhagat", BookController.getBooksByChetanBhagat)
router.get("/authorOfBook", BookController.authorOfBook)
router.get("/getBooksByAuthorId/:requireID",BookController.getBooksByAuthorId)
router.get("/getAuthorByAge",BookController.getAuthorByAge)

module.exports = router;