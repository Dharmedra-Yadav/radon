const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const auth1=require('../middleware/auth')

/******************************Simple API******************************************/
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

/**************************Data Create API in DB***********************************/
router.post("/users",userController.createUser)

/**************************Login API**********************************************/
router.post("/login", userController.loginUser)

//The userId is sent by front end
/**************************UserId-Login API****************************************/
router.get("/users/:userId", auth1.authorise,userController.getUserData)

/**************************UserId-Login in Post API********************************/
router.post("/users/:userId/posts",auth1.authorise, userController.postMessage)

/**************************Update API**********************************************/
router.put("/users/:userId", auth1.authorise,userController.updateUser)

/**************************Delete API*********************************************/
router.delete('/users/:userId',auth1.authorise, userController.deleteUser)

module.exports = router;