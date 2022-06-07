const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../models")

/*-----------------------Create API------------------------------*/
router.post("/createAuthor", BookController.createAuthor)
router.get("/createBook", BookController.createBook)
router.post("/getBooksByChetanBhagat", BookController.getBooksByChetanBhagat)
router.get("/authorOfBook", BookController.authorOfBook)

module.exports = router;