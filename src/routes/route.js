const express = require('express');
const router = express.Router();
const commonMW1 = require ("../middlewares/commonMiddleware2")
const userController=require('../controllers/userController')


router.post("/createUser",userController.createuser)
router.post("/createProduct",userController.createpropduct)
router.post("/createOrder",commonMW1.checkHeader,commonMW1.checkHeader)
module.exports = router;