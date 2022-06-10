const express = require('express');
const router = express.Router();

/******************************Import All Method in this lines***************************/
const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishedController=require("../controllers/publisherController")

/******************************API Create This lines************************************/
router.post("/createAuthor", authorController.createAuthor )
router.post("/createPublisher",publishedController.createPublisher)
router.post("/createBook", bookController.createBook)
router.get("/getBooksData", bookController.getBooksData)

module.exports = router;