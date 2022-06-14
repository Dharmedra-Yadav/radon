const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mid=require('../middleware/auth')

/*******************ALL API CREATED****************************/
router.post("/users",userController.createUser)

router.post("/login",userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",mid.middAuth,userController.getUserData)

router.put("/users/:userId", mid.middAuth,userController.updateUser)

router.delete("/users/:usrId",mid.middAuth,userController.userDelete)


module.exports = router;